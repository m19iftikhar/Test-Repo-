"use client";

import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import DropDownImg from "../../../../../public/assets/svgs/select-dropdown-arrow.svg";
import Image from "next/image";
import SvgComp from "../../SvgComp";

const DropdownIndicator = () => {
  return (
    <>
      <Image src={DropDownImg.src} width={24} height={24} alt="icon" />
    </>
  );
};

const SelectField = (props: any) => {
  return (
    <div className="input-container">
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
      <div className="input-wrapper">
        <Controller
          name={props.name}
          control={props.control}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <div className="select__wrapper">
                {props.icon && (
                  <SvgComp src={props.icon} className="select__icon" />
                )}
                <Select
                  options={props.options}
                  components={{ DropdownIndicator }}
                  placeholder={props.placeholder}
                  onChange={(options: any) => {
                    onChange(options);
                    props.onChange && props.onChange(options);
                  }}
                  onBlur={onBlur}
                  id="selectbox"
                  instanceId="selectbox"
                  value={value}
                  defaultValue={value}
                  isDisabled={props.disabled ? true : false}
                  isClearable={props.clearable ? true : false}
                  isSearchable={props.search ? true : false}
                  isMulti={props.multiSelect ? true : false}
                  className={`custom__select ${props.customClass || ""}`}
                  classNamePrefix="custom__select"
                  styles={{
                    control: (val, state) => ({
                      ...val,
                      minHeight: props.minHeight || "3.4375em",
                      borderRadius: "0.75em",
                      cursor: "pointer",
                      borderColor: `${
                        props.error
                          ? "rgba(var(--rgb-dangercol), 1)"
                          : props.borderColor ||
                            "rgba(var(--rgb-blackcol), 0.1)"
                      }`,
                      borderWidth: "2px",
                      backgroundColor: "var(--color-whitecol)",
                      "&:hover": {
                        borderColor: `${
                          props.error
                            ? "rgba(var(--rgb-dangercol), 1)"
                            : "rgba(var(--rgb-blackcol), 0.1)"
                        }`,
                      },
                      paddingRight: "0.88em",
                      paddingLeft: "0.88em",
                      boxShadow: "none",
                    }),
                    valueContainer: (vcontain) => ({
                      ...vcontain,
                      fontSize: "1.125em",
                      color: "var(--color-blackcol)",
                      padding: "0",
                    }),
                    singleValue: (scontain) => ({
                      ...scontain,
                      color: "var(--color-blackcol)",
                    }),

                    indicatorSeparator: (icontain) => ({
                      ...icontain,
                      backgroundColor: "transparent",
                    }),
                    dropdownIndicator: (dcontain) => ({
                      ...dcontain,
                    }),
                    option: (vcontain, state) => ({
                      ...vcontain,
                      cursor: "pointer",
                      borderRadius: "0.75em",
                      color: state.isFocused
                        ? "var(--color-blackcol)"
                        : "var(--color-blackcol)",
                      backgroundColor: state.isFocused
                        ? "var(--color-bgcol2)"
                        : "rgba(var(--rgb-bgcol3), 0.4)",
                    }),
                    menu: (styles) => ({
                      ...styles,
                      zIndex: 99,
                      minHeight: "auto",
                    }),
                    placeholder: (place) => ({
                      ...place,
                      color: `${
                        props.error
                          ? "var(--color-dangercol)"
                          : "var(--color-secondarycol)"
                      }`,
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: "#262b2b",
                      primary50: "rgba('#262b2b', 0.5')",
                      primary25: "rgba('#262b2b', 0.25')",
                    },
                  })}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default SelectField;
