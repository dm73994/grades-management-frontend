import type { Subject } from "../models/Subject.model";

export type CreateSubjectModel = Pick<Subject, 'name' | 'code' | 'credits'>;
