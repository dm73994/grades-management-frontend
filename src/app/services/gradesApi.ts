import { customAxios } from '../configs/customAxios';
import type { Grade } from '../data/models/Grade.model';
import type { CreateGradeModel } from '../data/request/GradeRequest';
import { catchAxiosError } from './cathAxiosError';

export const createGrade = async (data: CreateGradeModel): Promise<Grade> => {
    try {
        const response = await customAxios.post<Grade>('/grades', data);
        return response.data;
    } catch (error) {
        const axiosError = catchAxiosError(error);
        throw new Error(axiosError);
    }
};

export const getGradesByStudentAndSubject = async (
    studentId: string,
    subjectId: number,
): Promise<Grade[]> => {
    try {
        const response = await customAxios.get<Grade[]>('/grades', {
            params: {
                studentId,
                subjectId,
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = catchAxiosError(error);
        throw new Error(axiosError);
    }
};
