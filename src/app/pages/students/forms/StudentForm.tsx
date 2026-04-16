import { useForm, type Resolver } from 'react-hook-form';
import type { CreateStudentModel, UpdateStudent } from '../../../data/request/StudenRequests';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentSchema } from './student.schema';
import FormInput from '../../../components/formInput/FormInput';

type StudentFormValues = {
    id: string;
    name: string;
    lastname: string;
    email: string;
    birthdate: Date;
};

interface StudentFormProps<T extends CreateStudentModel | UpdateStudent> {
    formType: 'edit' | 'create';
    initialData?: T;
    onSubmit?: (data: T) => void;
    onCancel?: () => void;
}

const StudentForm = ({
    formType,
    initialData,
    onSubmit,
    onCancel,
}: StudentFormProps<CreateStudentModel | UpdateStudent>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StudentFormValues>({
        defaultValues: {
            id: (initialData as CreateStudentModel)?.id ?? '',
            name: initialData?.name ?? '',
            lastname: initialData?.lastname ?? '',
            email: initialData?.email ?? '',
            birthdate: initialData?.birthdate ?? new Date(),
        },
        resolver: yupResolver(studentSchema) as Resolver<StudentFormValues>,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit || (() => {}))} className="form-container">
            <div className="form-grid">
                {formType === 'create' && (
                    <FormInput
                        label="Documento de identidad"
                        {...register('id')}
                        error={errors.id?.message}
                    />
                )}

                <FormInput label="Nombre" {...register('name')} error={errors.name?.message} />

                <FormInput
                    label="Apellido"
                    {...register('lastname')}
                    error={errors.lastname?.message}
                />

                <FormInput
                    label="Correo electrónico"
                    {...register('email')}
                    error={errors.email?.message}
                />

                <FormInput
                    label="Fecha de nacimiento"
                    type="date"
                    {...register('birthdate')}
                    error={errors.birthdate?.message}
                />
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {formType === 'create' ? 'Crear' : 'Actualizar'}
                </button>

                {onCancel && (
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default StudentForm;
