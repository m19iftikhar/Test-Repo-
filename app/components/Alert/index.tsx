"use client";

import SvgComp from "../General/SvgComp";

import style from "./Alert.module.scss";

interface AlertProps {
  message: any;
  variant: any; //"success" | "failed" | "warning"
  onClose?: any;
  customClass?: any;
}

const Alert = ({
  message,
  variant = "success",
  onClose,
  customClass,
}: AlertProps) => {
  return (
    <div
      className={`${style.alert} ${variant ? style[variant] : ""} ${
        customClass || ""
      }`}
    >
      <div className={style.alertWrapper}>
        <div className={`${style.alertBody}`}>
          <div className={style.message}>
            <SvgComp
              src={
                variant === "success"
                  ? "/assets/svgs/check-rounded.svg"
                  : "/assets/svgs/warning.svg"
              }
            />

            <p className="mb-0 fw-500">{message}</p>
          </div>
          <div
            className={style.closeIcon}
            onClick={() => {
              onClose?.();
            }}
          >
            <SvgComp
              className={style.close}
              src="/assets/svgs/close-filled.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
