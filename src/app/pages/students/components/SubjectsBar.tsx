import type { Subject } from '../../../data/models/Subject.model';
import './subject-bar.css';

interface SubjectsBarProps {
    loading: boolean;
    error: string | null;
    subjects: Subject[];
    selectedId: number | null;
    onSelectSubject: (id: number) => void;
}

export const SubjectsBar = ({
    loading,
    error,
    subjects,
    selectedId,
    onSelectSubject,
}: SubjectsBarProps) => {
    return (
        <div className="subjects-bar">
            {loading && <p>Cargando materias...</p>}
            {error && <p className="error">Error al cargar materias</p>}

            {!loading && !error && (
                <ul className="subjects-list">
                    {subjects.map((subject) => (
                        <li
                            key={subject.id}
                            onClick={() => onSelectSubject(subject.id)}
                            className={`subject-item ${selectedId === subject.id ? 'active' : ''}`}
                        >
                            {subject.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
