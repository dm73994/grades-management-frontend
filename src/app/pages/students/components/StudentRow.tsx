import type { Student } from "../../../data/models/Student.model";

interface StudentRowProps {
  data: Student;
  index?: number;
  onView?: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onDelete?: (student: Student) => void;
}

const StudentRow = ({ data, index, onView, onEdit, onDelete }: StudentRowProps) => {
  return (
    <tr className="table-row">
      <td>{index !== undefined ? index + 1 : ""}</td>
      <td>
        {data.name} {data.lastname}
      </td>
      <td className="actions-cell">
        <button className="btn-action" onClick={() => onView && onView(data)}>
          <span className="material-symbols-rounded">visibility</span> Ver
        </button>
        <button className="btn-action" onClick={() => onEdit && onEdit(data)}>
          <span className="material-symbols-rounded">edit</span> Editar
        </button>
        <button className="btn-action danger" onClick={() => onDelete && onDelete(data)}>
          <span className="material-symbols-rounded">delete</span> Eliminar
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
