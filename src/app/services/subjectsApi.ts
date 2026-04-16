import { customAxios } from '../configs/customAxios';
import type { Subject } from '../data/models/Subject.model';
import type { CreateSubjectModel } from '../data/request/SubjectRequests';
import { catchAxiosError } from './cathAxiosError';

export const getAllSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await customAxios.get('/subjects');
        return response.data;
    } catch (error) {
        const axiosError = catchAxiosError(error);
        throw new Error(axiosError);
    }
};

export const getSubjectById = async (id: number): Promise<Subject> => {
    try {
        const response = await customAxios.get(`/subjects/${id}`);
        return response.data;
    } catch (error) {
        const axiosError = catchAxiosError(error);
        throw new Error(axiosError);
    }
};

export const createSubject = async (subjectData: CreateSubjectModel): Promise<Subject> => {
    try {
        const response = await customAxios.post('/subjects', subjectData);
        return response.data;
    } catch (error) {
        const axiosError = catchAxiosError(error);
        throw new Error(axiosError);
    }
};

export const updateSubject = async (
    id: number,
    subjectData: CreateSubjectModel,
): Promise<Subject> => {
    try {
        const response = await customAxios.put(`/subjects/${id}`, subjectData);
        return response.data;
    } catch (error) {
        const axiosError = catchAxiosError(error);
        throw new Error(axiosError);
    }
};

export const deleteSubject = async (id: number): Promise<void> => {
    try {
        await customAxios.delete(`/subjects/${id}`);
    } catch (error) {
        const axiosError = catchAxiosError(error);
        throw new Error(axiosError);
    }
};
