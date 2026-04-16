import type { Student } from "../models/Student.model";


export type CreateStudentModel = Omit<Student, "age">;
export type UpdateStudent = Omit<Student, "age" | "id">