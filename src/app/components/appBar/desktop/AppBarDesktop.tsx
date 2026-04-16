import HighlightText from "../../typography/HighlightText";
import SecondaryText from "../../typography/SecondaryText";
import "../appbar.css";

const AppBarDesktop = () => {
  return (
    <div className="app-bar">
      <div className="app-bar-left">
        <HighlightText text="Notas App" />
      </div>

      <div className="app-bar-right">
        <div className="user-info">
          <HighlightText text="Carlos David Mesa Martínez" />
          <SecondaryText text="Administrador" />
        </div>

        <img
          src="/user_.png"
          alt="User"
          className="user-avatar"
        />
      </div>
    </div>
  );
};

export default AppBarDesktop;