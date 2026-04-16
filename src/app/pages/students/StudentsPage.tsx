import { useEffect, useState } from 'react';
import Title from '../../components/typography/Title';
import Drawer from '../../components/drawer/Drawer';
import type { Student } from '../../data/models/Student.model';
import StudentRow from './components/StudentRow';
import StudentForm from './forms/StudentForm';
import type { CreateStudentModel, UpdateStudent } from '../../data/request/StudenRequests';
import Swal from 'sweetalert2';
import ViewStudentDetails from './components/ViewStudentDetails';
import { useStudent } from '../../hooks/useStudent';
import { useSubject } from '../../hooks/useSubject';
import { SubjectsBar } from './components/SubjectsBar';

interface DrawerState {
    open: boolean;
    student: Student | null;
    action: 'view' | 'edit' | 'create' | null;
}

const StudentsPage = () => {
    const [drawerState, setDrawerState] = useState<DrawerState>({
        open: false,
        student: null,
        action: null,
    });
    const {
        loading,
        error,
        students,
        fetchAllStudents,
        addStudent,
        editStudent,
        removeStudent,
        fetchStudentDetails,
    } = useStudent();
    const {
        loading: subjectsLoading,
        error: subjectsError,
        subjects,
        fetchAllSubjects,
    } = useSubject();

    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

    const handleEditStudent = (student: Student) => {
        setDrawerState({
            open: true,
            student,
            action: 'edit',
        });
    };

    const handleCreateStudent = () => {
        setDrawerState({
            open: true,
            student: null,
            action: 'create',
        });
    };

    const handleViewStudent = (student: Student) => {
        setDrawerState({
            open: true,
            student,
            action: 'view',
        });
    };

    const handleDeleteStudent = async (student: Student) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar a ${student.name} ${student.lastname}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (res) => {
            if (res.isConfirmed) {
                await removeStudent(student.id);
                Swal.fire(
                    'Eliminado',
                    `${student.name} ${student.lastname} ha sido eliminado.`,
                    'success',
                );
            }
        });
    };

    const resetDrawerState = () => {
        setDrawerState({
            open: false,
            action: null,
            student: null,
        });
    };

    useEffect(() => {
        fetchAllStudents();
        fetchAllSubjects();
    }, []);

    useEffect(() => {
        if (selectedSubjectId) {
        }
    }, [selectedSubjectId]);

    useEffect(() => {
        if (error || subjectsError) {
            resetDrawerState();
            fetchAllStudents();
            fetchAllSubjects();
            Swal.fire(
                'Error',
                error?.message || subjectsError?.message || 'Ocurrió un error inesperado',
                'error',
            );
        }
    }, [error, subjectsError]);

    return (
        <div className="page-container">
            <div className="page-header">
                <Title text="Listado de estudiantes" />
                <button className="btn-primary" onClick={handleCreateStudent}>
                    Agregar estudiante
                </button>
            </div>

            <SubjectsBar
                error={subjectsError?.message!}
                loading={subjectsLoading}
                subjects={subjects}
                onSelectSubject={setSelectedSubjectId}
                selectedId={selectedSubjectId}
            />

            {loading && <p>Cargando estudiantes...</p>}
            {!loading && !error && students.length === 0 && <p>No hay estudiantes registrados.</p>}
            {!loading && !error && students.length > 0 && (
                <table className="students-table">
                    <thead>
                        <tr>
                            <th className="actions-column">Acciones</th>
                            <th className='name-column'>Nombre</th>
                            {selectedSubjectId && <th>Notas</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <StudentRow
                                key={student.id}
                                data={student}
                                onView={handleViewStudent}
                                onEdit={handleEditStudent}
                                onDelete={handleDeleteStudent}
                                {...(selectedSubjectId && {
                                    onAddGrade: () => {
                                        setDrawerState({
                                            open: true,
                                            student,
                                            action: 'view',
                                        });
                                    },
                                    selectedSubjectId,
                                })}
                            />
                        ))}
                    </tbody>
                </table>
            )}

            {drawerState.open && (
                <Drawer
                    title={
                        drawerState.action === 'create'
                            ? 'Crear nuevo estudiante'
                            : 'Detalles del estudiante'
                    }
                    open={drawerState.open}
                    onClose={() => {
                        setDrawerState({
                            ...drawerState,
                            open: false,
                            student: null,
                            action: null,
                        });
                    }}
                >
                    {['edit', 'create'].includes(drawerState.action!) && (
                        <StudentForm
                            formType={drawerState.action as 'edit' | 'create'}
                            initialData={drawerState.student || undefined}
                            onCancel={() => {
                                setDrawerState({
                                    ...drawerState,
                                    open: false,
                                    student: null,
                                    action: null,
                                });
                            }}
                            onSubmit={(data) => {
                                if (drawerState.action === 'create')
                                    addStudent(data as CreateStudentModel);
                                else editStudent(drawerState.student!.id, data as UpdateStudent);

                                setDrawerState({
                                    ...drawerState,
                                    open: false,
                                    student: null,
                                    action: null,
                                });
                            }}
                        />
                    )}
                    {drawerState.action === 'view' && (
                        <ViewStudentDetails
                            studentId={drawerState.student!.id}
                            loadStudentDetails={fetchStudentDetails}
                            error={error?.message || ''}
                        />
                    )}
                </Drawer>
            )}
        </div>
    );
};

export default StudentsPage;
