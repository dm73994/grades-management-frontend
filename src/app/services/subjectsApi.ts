import { customAxios } from "../configs/customAxios";
import type { Subject } from "../data/models/Subject.model";
import type { CreateSubjectModel } from "../data/request/SubjectRequests";

export const getAllSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await customAxios.get('/subjects');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener las materias');
    }
}

export const getSubjectById = async (id: number): Promise<Subject> => {
    try {
        const response = await customAxios.get(`/subjects/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener la materia');
    }
}

export const createSubject = async (subjectData: CreateSubjectModel): Promise<Subject> => {
    try {
        const response = await customAxios.post('/subjects', subjectData);
        return response.data;
    } catch (error) {
        throw new Error('Error al crear la materia');
    }
}

export const updateSubject = async (id: number, subjectData: CreateSubjectModel): Promise<Subject> => {
    try {
        const response = await customAxios.put(`/subjects/${id}`, subjectData);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar la materia');
    }
}

export const deleteSubject = async (id: number): Promise<void> => {
    try {
        await customAxios.delete(`/subjects/${id}`);
    } catch (error) {
        throw new Error('Error al eliminar la materia');
    }
}