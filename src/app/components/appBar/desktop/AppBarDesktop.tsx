import HighlightText from "../../typography/HighlightText";
import SecondaryText from "../../typography/SecondaryText";
import "../appbar.css";

const AppBarDesktop = () => {
  return (
    <div className="app-bar-container">
      <HighlightText text="Notas App"/>

      <div className="app-bar-links">
        <div>
          <HighlightText text="Carlos David Mesa Matínez" styles={{lineHeight: '.5rem'}} />
          <SecondaryText text="Administrador" styles={{lineHeight: '.5rem'}} />
        </div>
        <img src="/user_.png" alt="User" style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
        }}/>
      </div>
    </div>
  );
};

export default AppBarDesktop;
