"use client";

import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";

import style from "./Popup.module.scss";
import SvgComp from "../General/SvgComp";

interface PopupProps {
  isOpen: boolean;
  title: string;
  description?: string;
  setOpen: any;
}

const Popup = ({ isOpen, setOpen, title, description }: PopupProps) => {
  return (
    <>
      <div className={`${style.popup} ${isOpen ? style.active : ""}`}>
        <div className={style.header}>
          <h3 className={style.title}>
            <div className={style.icon}>
              <SvgComp src="/assets/svgs/warning.svg" />
            </div>
            {title}
          </h3>
          <div className={style.iconClose}>
            <PrimaryAnchor
              title=""
              icon="close-gray"
              type="button"
              variant="icon_btn"
              iconSize="popupClose"
              func={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
        <div className={style.description}>{description}</div>

        <div className={style.footer}>
          <div className="d-flex align-items-center justify-end column-gap-18">
            <PrimaryAnchor
              type="button"
              title="Cancel"
              size="sm"
              variant="grey__btn"
            />

            <PrimaryAnchor
              type="submit"
              spinnerClass="sm"
              size="sm"
              title="Delete"
              variant="danger__btn"
            />
          </div>
        </div>
      </div>
      <div className={style.overlay}></div>
    </>
  );
};

export default Popup;
