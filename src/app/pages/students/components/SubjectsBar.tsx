import type { Subject } from '../../../data/models/Subject.model';

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
                <div className="subjects-list">
                    {subjects.map((subject) => (
                        <button
                            key={subject.id}
                            onClick={() => onSelectSubject(subject.id)}
                            className={`subject-tab ${selectedId === subject.id ? 'active' : ''}`}
                        >
                            <span className="subject-name">{subject.name}</span>
                            <span className="subject-code">{subject.code}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
