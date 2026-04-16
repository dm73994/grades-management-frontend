import { useEffect, useState } from 'react';
import Title from '../../components/typography/Title';
import Typography from '../../components/typography/Typography';
import Button from '../../components/button/Button';
import type { Subject } from '../../data/models/Subject.model';
import Swal from 'sweetalert2';
import Drawer from '../../components/drawer/Drawer';
import SubjectForm from './forms/SubjectForm';
import ViewSubjectDetails from './components/ViewSubjectDetails';
import { useSubject } from '../../hooks/useSubject';

const SubjectsPage = () => {
    const [drawerState, setDrawerState] = useState<{
        open: boolean;
        subject: Subject | null;
        action: 'view' | 'edit' | 'create' | null;
    }>({
        open: false,
        subject: null,
        action: null,
    });

    const {
        loading,
        error,
        subjects,
        fetchAllSubjects,
        addSubject,
        editSubject,
        removeSubject,
        fetchSubjectDetails,
    } = useSubject();

    const handleEditSubject = (subject: Subject) => {
        setDrawerState({
            open: true,
            subject,
            action: 'edit',
        });
    };

    const handleCreateSubject = () => {
        setDrawerState({
            open: true,
            subject: null,
            action: 'create',
        });
    };

    const handleViewSubject = (subject: Subject) => {
        setDrawerState({
            open: true,
            subject,
            action: 'view',
        });
    };

    const handleDeleteSubject = async (subject: Subject) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Esta acción eliminará "${subject.name}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
        });

        if (!result.isConfirmed) return;

        const res = await removeSubject(subject.id);

        if (res !== null) {
            Swal.fire('Eliminada', 'La materia fue eliminada.', 'success');
        }
    };

    const resetDrawerState = () => {
        setDrawerState({
            open: false,
            subject: null,
            action: null,
        });
    };

    useEffect(() => {
        fetchAllSubjects();
    }, []);

    useEffect(() => {
        if (error) {
            resetDrawerState();
            fetchAllSubjects();
            Swal.fire('Error', error.message || 'Ocurrió un error inesperado', 'error');
        }
    }, [error]);

    return (
        <div className="page-container">
            <div className="page-header">
                <Title text="Listado de materias" />
                <Button variant="primary" onClick={handleCreateSubject}>
                    Agregar materia
                </Button>
            </div>

            {loading && <p>Cargando materias...</p>}

            {!loading && !error && subjects.length === 0 && <p>No hay materias registradas.</p>}

            {!loading && !error && subjects.length > 0 && (
                <div className="details-flex">
                    {subjects.map((subject) => (
                        <div key={subject.id} className="details-card-shadow">
                            <Typography variant="subtitle">{subject.name}</Typography>

                            <Typography variant="caption">Créditos: {subject.credits}</Typography>

                            <div className="card-actions">
                                <Button
                                    variant="secondary"
                                    onClick={() => handleEditSubject(subject)}
                                >
                                    Editar
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteSubject(subject)}
                                >
                                    Eliminar
                                </Button>

                                <Button
                                    variant="primary"
                                    onClick={() => handleViewSubject(subject)}
                                >
                                    Ver detalles
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {drawerState.open && drawerState.action && (
                <Drawer
                    title={
                        drawerState.action === 'create'
                            ? 'Crear nueva materia'
                            : drawerState.action === 'edit'
                              ? 'Editar materia'
                              : 'Ver detalles de la materia'
                    }
                    open={drawerState.open}
                    onClose={resetDrawerState}
                >
                    {(drawerState.action === 'create' || drawerState.action === 'edit') && (
                        <SubjectForm
                            formType={drawerState.action}
                            initialData={drawerState.subject}
                            onSubmit={async (data) => {
                                let res;
                                if (drawerState.action === 'create') {
                                    res = await addSubject(data);
                                }

                                if (drawerState.action === 'edit' && drawerState.subject) {
                                    res = await editSubject(drawerState.subject.id, data);
                                }
                                if (res) {
                                    Swal.fire(
                                        'Actualizada',
                                        'La materia fue actualizada exitosamente.',
                                        'success',
                                    );
                                    resetDrawerState();
                                }
                            }}
                            onCancel={resetDrawerState}
                        />
                    )}
                    {drawerState.action === 'view' && (
                        <ViewSubjectDetails
                            error={error?.message || ''}
                            loadSubjectDetails={fetchSubjectDetails}
                            subjectId={drawerState.subject?.id!}
                        />
                    )}
                </Drawer>
            )}
        </div>
    );
};

export default SubjectsPage;
