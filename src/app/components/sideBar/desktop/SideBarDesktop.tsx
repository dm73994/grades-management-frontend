import { useState } from "react";
import "../sideBar.css";
import { NavLink } from "react-router";

interface MenuOption {
  name: string;
  path: string;
  iconName: string;
}

const SideBarDesktop = () => {
  const [open, setOpen] = useState(false);
  const menuOptions: MenuOption[] = [
    { name: "Estudiantes", path: "/students", iconName: "school" },
    { name: "Materias", path: "/subjects", iconName: "book" },
  ];

  return (
    <div className={`SideBarContainer ${open ? "open" : "close"}`}>
      <div className="SideBar-header">
        {open && <h3>Notas App</h3>}
        <div className="SideBar-toggle" onClick={() => setOpen(!open)}>
          <span className="material-symbols-rounded">
            {open ? "arrow_back_ios" : "arrow_forward_ios"}
          </span>
        </div>
      </div>

      <div className="SideBar-content">
        <ul className="SideBar-menu">
          {menuOptions.map((option) => (
            <NavLink
              key={option.path}
              to={option.path}
              className="SideBar-link"
            >
              <span className="material-symbols-rounded">
                {option.iconName}
              </span>
              {open && <span>{option.name}</span>}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBarDesktop;
