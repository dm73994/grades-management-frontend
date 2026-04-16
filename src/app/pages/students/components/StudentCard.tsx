import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../../../components/button/Button';
import type { Student } from '../../../data/models/Student.model';
import type { CreateGradeModel } from '../../../data/request/GradeRequest';
import { useGrades } from '../../../hooks/useGrade';

interface StudentCardProps {
    data: Student;
    onView?: (student: Student) => void;
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    selectedSubjectId?: number | null;
}

const StudentCard = ({ data, onView, onEdit, onDelete, selectedSubjectId }: StudentCardProps) => {
    const { grades, fetchGrades, loading, addGrade, error } = useGrades();

    const handleAddGrade = () => {
        Swal.fire({
            title: 'Agregar nota',
            input: 'number',
            inputAttributes: {
                min: '0',
                max: '5',
                step: '0.1',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req: CreateGradeModel = {
                    studentId: data.id,
                    subjectId: selectedSubjectId!,
                    value: parseFloat(result.value),
                };
                await addGrade(req);
            }
        });
    };

    useEffect(() => {
        if (selectedSubjectId) {
            fetchGrades(data.id, selectedSubjectId);
        }
    }, [selectedSubjectId, data.id]);

    useEffect(() => {
        if (error) {
            if (selectedSubjectId) {
                fetchGrades(data.id, selectedSubjectId);
            }
            Swal.fire('Error', error?.message || 'Ocurrió un error inesperado', 'error');
        }
    }, [error]);

    return (
        <div className="student-card">
            <div className="card-top">
                <span className="card-name">
                    {data.name} {data.lastname}
                </span>
            </div>

            {selectedSubjectId && (
                <div className="card-grades">
                    {loading ? (
                        <span>Cargando...</span>
                    ) : grades.length > 0 ? (
                        grades.map((g) => (
                            <span key={g.id} className="grade-pill">
                                {g.value}
                            </span>
                        ))
                    ) : (
                        <span className="no-grades">Sin notas</span>
                    )}
                </div>
            )}

            <div className="card-actions">
                <Button variant="primary" onClick={() => onView?.(data)}>
                    <span className="material-symbols-rounded">visibility</span>
                </Button>

                <Button variant="secondary" onClick={() => onEdit?.(data)}>
                    <span className="material-symbols-rounded">edit</span>
                </Button>

                <Button variant="danger" onClick={() => onDelete?.(data)}>
                    <span className="material-symbols-rounded">delete</span>
                </Button>

                {selectedSubjectId && (
                    <Button variant="success" onClick={handleAddGrade}>
                        <span className="material-symbols-rounded">add_circle</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StudentCard;
