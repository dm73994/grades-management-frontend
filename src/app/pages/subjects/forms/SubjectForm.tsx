import { useForm } from 'react-hook-form';
import type { CreateSubjectModel } from '../../../data/request/SubjectRequests';
import { yupResolver } from '@hookform/resolvers/yup';
import { subjectSchema } from './subject.schema';
import FormInput from '../../../components/formInput/FormInput';

interface SubjectFormProps {
    formType: 'create' | 'edit';
    initialData?: CreateSubjectModel | null;
    onSubmit: (data: CreateSubjectModel) => void;
    onCancel: () => void;
}

const SubjectForm = ({ formType, initialData, onSubmit, onCancel }: SubjectFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateSubjectModel>({
        defaultValues: initialData || {
            name: '',
            code: '',
            credits: 10,
        },
        resolver: yupResolver(subjectSchema),
    });
    return (
        <form onSubmit={handleSubmit(onSubmit || (() => {}))} className="form-container">
            <div className="form-grid">
                {formType === 'create' && (
                    <FormInput
                        label="Código de la materia"
                        {...register('code')}
                        error={errors.code?.message}
                    />
                )}

                <FormInput label="Materia" {...register('name')} error={errors.name?.message} />

                <FormInput
                    label="Créditos"
                    {...register('credits')}
                    error={errors.credits?.message}
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

export default SubjectForm;
