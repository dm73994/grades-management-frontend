import { useCallback, useState } from 'react';
import type { Student } from '../data/models/Student.model';
import type { CreateStudentModel, UpdateStudent } from '../data/request/StudenRequests';
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
} from '../services/studentsApi';
import { useRequest } from './useRequest';

export const useStudent = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const { loading, error, makeRequest } = useRequest();

    const fetchAllStudents = useCallback(async () => {
        const data = await makeRequest(() => getAllStudents());
        if (data) {
            setStudents(data);
        }
    }, [makeRequest]);

    const fetchStudentDetails = useCallback(
        async (id: string) => {
            const data = await makeRequest(() => getStudentById(id));
            return data;
        },
        [makeRequest],
    );

    const addStudent = useCallback(
        async (student: CreateStudentModel) => {
            const res = await makeRequest(() => createStudent(student));
            if (res) {
                setStudents((prev) => {
                    // borrar duplicados por id
                    const exists = prev.some((s) => s.id === res.id);
                    return exists ? prev : [...prev, res];
                });
            }
        },
        [makeRequest],
    );

    const editStudent = useCallback(
        async (id: string, student: UpdateStudent) => {
            const res = await makeRequest(() => updateStudent(id, student));
            if (res) {
                setStudents((prev) => prev.map((s) => (s.id === id ? res : s)));
            }
        },
        [makeRequest],
    );

    const removeStudent = useCallback(
        async (id: string) => {
            await makeRequest(() => deleteStudent(id));
            setStudents((prev) => prev.filter((s) => s.id !== id));
        },
        [makeRequest],
    );

    const resetStudents = () => setStudents([]);

    return {
        students,
        loading,
        error,
        fetchAllStudents,
        addStudent,
        editStudent,
        removeStudent,
        resetStudents,
        fetchStudentDetails,
    };
};
