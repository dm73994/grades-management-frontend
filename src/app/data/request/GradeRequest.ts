import type { Grade } from "../models/Grade.model";

export type CreateGradeModel = Omit<Grade, 'id' | 'createdAt'>