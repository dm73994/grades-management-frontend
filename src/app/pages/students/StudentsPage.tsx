import { useEffect, useState } from 'react';
import Title from '../../components/typography/Title';
import { useStudent } from './useStudent';
import Drawer from '../../components/drawer/Drawer';
import type { Student } from '../../data/models/Student.model';
import StudentRow from './components/StudentRow';
import StudentForm from './forms/StudentForm';
import type { CreateStudentModel, UpdateStudent } from '../../data/request/StudenRequests';
import Swal from 'sweetalert2';
import ViewStudentDetails from './components/ViewStudentDetails';

interface DrawerState {
    open: boolean;
    student: Student | null;
    action: 'view' | 'edit' | 'create' | null;
}

const StudentsPage = () => {
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
    const [drawerState, setDrawerState] = useState<DrawerState>({
        open: false,
        student: null,
        action: null,
    });

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

    useEffect(() => {
        fetchAllStudents();
    }, []);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            });
        }
    }, [error]);

    return (
        <div className="page-container">
            <div className="page-header">
                <Title text="Listado de estudiantes" />
                <button className="btn-primary" onClick={handleCreateStudent}>
                    Agregar estudiante
                </button>
            </div>

            {loading && <p>Cargando estudiantes...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && students.length === 0 && <p>No hay estudiantes registrados.</p>}

            {!loading && !error && students.length > 0 && (
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Nombre</th>
                            <th className="actions-column">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <StudentRow
                                key={student.id}
                                data={student}
                                index={index}
                                onView={handleViewStudent}
                                onEdit={handleEditStudent}
                                onDelete={handleDeleteStudent}
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
                            error={error}
                        />
                    )}
                </Drawer>
            )}
        </div>
    );
};

export default StudentsPage;
