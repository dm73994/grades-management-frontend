import { useCallback, useState } from 'react';
import type { Subject } from '../data/models/Subject.model';
import type { CreateSubjectModel } from '../data/request/SubjectRequests';
import { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } from '../services/subjectsApi';
import { useRequest } from './useRequest';

export const useSubject = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const { loading, error, makeRequest } = useRequest();

    const fetchAllSubjects = useCallback(async () => {
        const data = await makeRequest(() => getAllSubjects());
        if (data) {
            setSubjects(data);
        }
    }, [makeRequest]);

    const fetchSubjectDetails = useCallback(
        async (id: number) => {
            const data = await makeRequest(() => getSubjectById(id));
            return data;
        },
        [makeRequest],
    );

    const addSubject = useCallback(
        async (subject: CreateSubjectModel) => {
            const res = await makeRequest(() => createSubject(subject));
            if (res) {
                setSubjects((prev) => {
                    // borrar duplicados por id
                    const exists = prev.some((s) => s.id === res.id);
                    return exists ? prev : [...prev, res];
                });
                return res;
            }
        },
        [makeRequest],
    );

    const editSubject = useCallback(
        async (id: number, subject: CreateSubjectModel) => {
            const res = await makeRequest(() => updateSubject(id, subject));
            if (res) {
                setSubjects((prev) => prev.map((s) => (s.id === id ? res : s)));
                return res;
            }
        },
        [makeRequest],
    );

    const removeSubject = useCallback(
        async (id: number) => {
            const res = await makeRequest(() => deleteSubject(id));
            if (res !== null) {
                setSubjects((prev) => prev.filter((s) => s.id !== id));
            }
            return res;
        },
        [makeRequest],
    );

    const resetSubjects = useCallback(() => {
        setSubjects([]);
    }, []);

    return {
        loading,
        error,
        subjects,
        fetchAllSubjects,
        addSubject,
        editSubject,
        removeSubject,
        resetSubjects,
        fetchSubjectDetails,
    };
};
