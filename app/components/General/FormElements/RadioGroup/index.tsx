import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import RadioButton from "./RadioButton";

const RadioGroup = (props: any) => {
  const { name, control, init, options, horizontal } = props;

  return (
    <div
      className={`input-container ${horizontal ? "horizontalRadioGroup" : ""}`}
    >
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
      <div className={`radio-wrapper ${horizontal ? "horizontalItems" : ""}`}>
        <Controller
          control={control}
          name={name}
          defaultValue={init}
          render={({ field: { onChange, ...prop } }) => (
            <>
              {options.map((option: any, index: number) => (
                <Fragment key={index}>
                  <RadioButton
                    {...prop}
                    value={option.id}
                    label={option.name}
                    onChange={(e: any) => {
                      onChange(e);
                      props.onChange && props.onChange(e);
                    }}
                  />
                </Fragment>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default RadioGroup;
