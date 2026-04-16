import { useEffect } from 'react';
import Button from '../../../components/button/Button';
import type { Student } from '../../../data/models/Student.model';
import { useGrades } from '../../../hooks/useGrade';
import './student-row.css';
import Swal from 'sweetalert2';
import type { CreateGradeModel } from '../../../data/request/GradeRequest';

interface StudentRowProps {
    data: Student;
    index?: number;
    onView?: (student: Student) => void;
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    selectedSubjectId?: number | null;
}

const StudentRow = ({
    data,
    onView,
    onEdit,
    onDelete,
    selectedSubjectId,
}: StudentRowProps) => {
    const { grades, fetchGrades, loading, addGrade, error } = useGrades();

    const handleAddGrade = () => {
        Swal.fire({
            title: 'Agregar nota',
            input: 'number',
            inputAttributes: {
                min: '0',
                max: '5',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req: CreateGradeModel = {
                    studentId: data.id,
                    subjectId: selectedSubjectId!,
                    value: result.value,
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
        <tr className="table-row">
            <td className="actions-cell">
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
                    <Button
                        variant="success"
                        onClick={() => handleAddGrade()}
                    >
                        <span className="material-symbols-rounded">add_circle</span>
                    </Button>
                )}
            </td>

            <td className="name-cell">
                {data.name} {data.lastname}
            </td>

            {selectedSubjectId && (
                <td className="grades-cell">
                    {loading ? (
                        'Cargando...'
                    ) : grades.length > 0 ? (
                        <div className="grades-container">
                            {grades.map((grade) => (
                                <div key={grade.id} className="grade-item">
                                    {grade.value}
                                </div>
                            ))}
                        </div>
                    ) : (
                        'No hay notas'
                    )}
                </td>
            )}
        </tr>
    );
};

export default StudentRow;
