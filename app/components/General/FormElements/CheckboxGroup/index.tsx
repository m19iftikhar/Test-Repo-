import { Fragment } from "react";
import { Controller } from "react-hook-form";
import Checkbox from "./Checkbox";

const CheckboxGroup = (props: any) => {
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
      <div className="checkbox-wrapper">
        <Controller
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <>
              {props.options.map((option: any, index: number) => (
                <Fragment key={index}>
                  <Checkbox
                    i={index}
                    field={field}
                    value={option.id}
                    label={option.name}
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

export default CheckboxGroup;
