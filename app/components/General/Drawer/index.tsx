import PrimaryAnchor from "../Buttons/PrimaryAnchor";
import style from "./drawer.module.scss";

interface DrawerProps {
  isOpen: boolean;
  disableClose?: boolean;
  title: string;
  setOpen: any;
  reset?: any;
  children: React.ReactNode;
  footer: React.ReactNode;
  onClose?: any;
}

const Drawer = ({
  isOpen,
  setOpen,
  title,
  children,
  footer,
  reset,
  disableClose,
  onClose,
}: DrawerProps) => {
  return (
    <>
      <div className={`${style.drawerContainer} ${isOpen ? style.active : ""}`}>
        <div className={style.drawer}>
          <div className={style.header}>
            <h2 className={style.title}>{title}</h2>
            <PrimaryAnchor
              title=""
              icon="close-gray"
              type="button"
              variant="icon_btn"
              iconSize="drawerClose"
              disabled={disableClose}
              func={() => {
                if (reset) {
                  reset();
                }
                setOpen(false);
                onClose?.();
              }}
            />
          </div>

          <div className={style.drawerBody}>{children}</div>

          <div className={style.footer}>{footer}</div>
        </div>
      </div>

      <div className={style.overlay}></div>
    </>
  );
};

export default Drawer;
