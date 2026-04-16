import { useEffect, useState } from 'react';
import type { Subject } from '../../../data/models/Subject.model';
import Swal from 'sweetalert2';
import './subject-details.css';

interface ViewSubjectDetailsProps {
    subjectId: number;
    loadSubjectDetails: (id: number) => Promise<Subject | null>;
    error: string | null;
}

const ViewSubjectDetails = ({ subjectId, loadSubjectDetails, error }: ViewSubjectDetailsProps) => {
    const [subject, setSubject] = useState<Subject | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchDetails = async () => {
        setLoading(true);
        const res = await loadSubjectDetails(subjectId);
        if (res) setSubject(res);
        setLoading(false);
    };

    useEffect(() => {
        if (subjectId) fetchDetails();
    }, [subjectId]);

    useEffect(() => {
        if (error) {
            Swal.fire('Error', error, 'error');
        }
    }, [error]);

    return (
        <div className="subject-details-container">
            {loading && <p className="details-loading">Cargando información...</p>}

            {!loading && subject && (
                <div className="subject-card">
                    <div className="subject-header">
                        <div className="subject-avatar">{subject.name.charAt(0)}</div>

                        <div>
                            <h2 className="subject-title">{subject.name}</h2>
                            <p className="subject-code">{subject.code}</p>
                        </div>
                    </div>

                    <div className="subject-grid">
                        <div className="subject-item">
                            <span className="label">Créditos</span>
                            <span className="value">{subject.credits}</span>
                        </div>

                        <div className="subject-item">
                            <span className="label">ID</span>
                            <span className="value">{subject.id}</span>
                        </div>

                        <div className="subject-item full">
                            <span className="label">Creado</span>
                            <span className="value">
                                {new Date(subject.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="subject-item full">
                            <span className="label">Actualizado</span>
                            <span className="value">
                                {new Date(subject.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {!loading && !subject && <p className="details-empty">No se encontró información</p>}
        </div>
    );
};

export default ViewSubjectDetails;
