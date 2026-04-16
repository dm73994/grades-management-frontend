import { useEffect, useState } from 'react';
import type { Subject } from '../../../data/models/Subject.model';

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
    return <div>ViewSubjectDetails</div>;
};

export default ViewSubjectDetails;
