import { useCallback, useState } from 'react';
import type { Grade } from '../data/models/Grade.model';
import { useRequest } from './useRequest';
import type { CreateGradeModel } from '../data/request/GradeRequest';
import { getGradesByStudentAndSubject, createGrade } from '../services/gradesApi';

export const useGrades = () => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const { loading, error, makeRequest } = useRequest();

    const fetchGrades = useCallback(
        async (studentId: string, subjectId: number) => {
            const data = await makeRequest(() =>
                getGradesByStudentAndSubject(studentId, subjectId),
            );

            if (data) {
                setGrades(data);
            }

            return data;
        },
        [makeRequest],
    );

    const addGrade = useCallback(
        async (grade: CreateGradeModel) => {
            const res = await makeRequest(() => createGrade(grade));

            if (res) {
                setGrades((prev) => [...prev, res]);
            }

            return res;
        },
        [makeRequest],
    );

    const resetGrades = useCallback(() => {
        setGrades([]);
    }, []);

    return {
        grades,
        loading,
        error,
        fetchGrades,
        addGrade,
        resetGrades,
    };
};
