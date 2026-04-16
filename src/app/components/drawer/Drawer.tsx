import Title from '../typography/Title';
import './drawer.css';

interface DrawerProps {
    children?: React.ReactNode;
    title?: string;
    open: boolean;
    onClose: () => void;
}

const Drawer = ({ children, title, open, onClose }: DrawerProps) => {
    return (
        <>
            <div
                className={`drawer-overlay ${open ? "visible" : ""}`}
                onClick={onClose}
            />

            <div className={`drawer ${open ? "open" : "closed"}`}>
                <Title text={title || "Drawer Title"} />
                <div className="drawer-body">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Drawer