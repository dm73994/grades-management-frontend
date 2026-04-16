import { customAxios } from "../configs/customAxios";
import type { Student } from "../data/models/Student.model";
import type { CreateStudentModel, UpdateStudent } from "../data/request/StudenRequests";

export const getAllStudents = async (): Promise<Student[]> => {
    try {
        const response = await customAxios.get<Student[]>("/students");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch students");
    }
}

export const getStudentById = async (id: string): Promise<Student> => {
    try {
        const response = await customAxios.get<Student>(`/students/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch student with id ${id}`);
    }
}

export const createStudent = async (student: CreateStudentModel): Promise<Student> => {
    try {
        const response = await customAxios.post<Student>("/students", student);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create student");
    }
}

export const updateStudent = async (id: string, student: UpdateStudent): Promise<Student> => {
    try {
        const response = await customAxios.put<Student>(`/students/${id}`, student);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update student with id ${id}`);
    }
}

export const deleteStudent = async (id: string): Promise<void> => {
    try {
        await customAxios.delete(`/students/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete student with id ${id}`);
    }
}