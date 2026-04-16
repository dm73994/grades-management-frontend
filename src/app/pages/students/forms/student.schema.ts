import * as yup from 'yup';

export const studentSchema = yup.object({
    id: yup.string().required('El documento es obligatorio'),
    name: yup.string().min(2).max(100).required(),
    lastname: yup.string().min(2).max(100).required(),
    email: yup.string().email().required(),
    birthdate: yup.date().required(),
});
