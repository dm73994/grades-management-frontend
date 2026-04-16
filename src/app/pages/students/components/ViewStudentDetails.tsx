import { useEffect, useState } from 'react';
import type { Student } from '../../../data/models/Student.model';
import Typography from '../../../components/typography/Typography';

interface ViewStudentDetailsProps {
    studentId: string;
    loadStudentDetails: (id: string) => Promise<Student | null>;
    error: string | null;
}

const ViewStudentDetails = ({ studentId, loadStudentDetails, error }: ViewStudentDetailsProps) => {
    const [student, setStudent] = useState<Student | null>(null);

    const fetchStudentDetails = async () => {
        const response = await loadStudentDetails(studentId);
        setStudent(response);
    };

    useEffect(() => {
        fetchStudentDetails();
    }, [studentId]);

    return (
        <div className="details-container">
            {error && <p className="details-error">{error}</p>}

            {!student && !error && <p className="details-loading">Cargando información...</p>}

            {student && (
                <div className="details-card">
                    <div className="details-header">
                        <img
                            src="/user_.png"
                            alt="User"
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                            }}
                        />
                        <div>
                            <Typography variant="title">
                                {student.name} {student.lastname}
                            </Typography>
                            <Typography variant="caption">Estudiante</Typography>
                        </div>
                    </div>

                    <div className="details-grid">
                        <div className="details-item">
                            <Typography variant="label">Identificación</Typography>
                            <Typography variant="body">{student.id}</Typography>
                        </div>

                        <div className="details-item">
                            <Typography variant="label">Edad</Typography>
                            <Typography variant="body">{student.age}</Typography>
                        </div>

                        <div className="details-item full">
                            <Typography variant="label">Correo</Typography>
                            <Typography variant="body">{student.email}</Typography>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewStudentDetails;
