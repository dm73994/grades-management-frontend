import { useEffect, useState } from 'react';
import type { Subject } from '../../../data/models/Subject.model';
import Swal from 'sweetalert2';

interface ViewSubjectDetailsProps {
    subjectId: number;
    loadSubjectDetails: (id: number) => Promise<Subject | null>;
    error: string | null;
}

const ViewSubjectDetails = ({ subjectId, loadSubjectDetails, error }: ViewSubjectDetailsProps) => {
    const [subject, setSubject] = useState<Subject>();

    const fetchDetails = async () => {
        const res = await loadSubjectDetails(subjectId);
        if (res) {
            setSubject(res);
        }
    };
    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (error) {
            if (subjectId) {
                fetchDetails();
            }
            Swal.fire('Error', error || 'Ocurrió un error inesperado', 'error');
        }
    }, [error]);
    return <div>{JSON.stringify(subject)}</div>;
};

export default ViewSubjectDetails;
