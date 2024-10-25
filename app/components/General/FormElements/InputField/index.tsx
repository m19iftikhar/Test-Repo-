import Image from "next/image";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

import checked from "../../../../../public/assets/svgs/checked.svg";

const InputField = (props: any) => {
  const [type, setType] = useState("password");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isreadonly, setisreadonly] = useState(props.editEnable);

  const toogle = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const ref: any = useRef(null);

  const handleClick = () => {
    setisreadonly(!isreadonly);
    ref.current.focus();
  };
  return (
    <div className={"input-container"}>
      {props.label && (
        <label className={"label"}>
          {props.label}
          {props.req ? (
            <>
              <span className="required"> *</span>
            </>
          ) : (
            ""
          )}
        </label>
      )}

      {props.hasCheckbox && (
        <label className={`checkbox singleCheckbox inputCheckbox`}>
          <div className={`inputWrapper`}>
            <input
              type="checkbox"
              onChange={() => {
                setIsDisabled((prev) => {
                  return !prev;
                });
              }}
              checked={isDisabled}
            />
            <div className={`customCheckbox`}>
              <Image src={checked.src} width={9} height={7} alt="icon" />
            </div>
          </div>
          <p className="checkbox-label">{props.checkboxLabel}</p>
        </label>
      )}

      <div className={"input-wrapper"}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field: { value, onChange } }) => {
            return (
              <>
                <input
                  ref={ref}
                  value={value}
                  type={props.eye ? type : props.type}
                  placeholder={props.placeholder ? props.placeholder : ""}
                  className={`input ${props.readOnly ? "readonly" : ""} ${
                    props.editEnable && isreadonly ? "editdisable" : ""
                  } ${props.class || ""} ${
                    !isDisabled && props.hasCheckbox ? "disabledInput" : ""
                  }`}
                  readOnly={props.editEnable ? isreadonly : props.readOnly}
                  disabled={!isDisabled && props.hasCheckbox}
                  onChange={(e) => {
                    onChange(e);
                    props.onChange && props.onChange(e);
                  }}
                />
                {props.eye && (
                  <span className={"password-icon"} onClick={() => toogle()}>
                    <Image
                      src={`/assets/svgs/${
                        type == "password"
                          ? "show-pass-eye.svg"
                          : "hide-pass-eye.svg"
                      }`}
                      alt="eye-icon"
                      width={20}
                      height={12}
                    />
                  </span>
                )}
                {props.editEnable && isreadonly && (
                  <button
                    type={"button"}
                    className="editBtn"
                    onClick={handleClick}
                  >
                    Edit
                  </button>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
