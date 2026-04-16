import * as yup from 'yup';

export const subjectSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    credits: yup
        .number()
        .typeError('Los créditos deben ser un número')
        .positive('Los créditos deben ser un número positivo')
        .integer('Los créditos deben ser un número entero')
        .required('Los créditos son obligatorios'),
    code: yup.string().required('El código es obligatorio'),
})