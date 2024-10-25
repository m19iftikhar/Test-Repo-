import Link from "next/link";
import InputField from "../FormElements/InputField";
import InputPhone from "../FormElements/InputPhone";
import TextAreaField from "../FormElements/TextAreaField";
import DropzoneField from "../FormElements/DropzoneField";
import RadioGroup from "../FormElements/RadioGroup";
import SelectField from "../FormElements/SelectField";
import DateTimeField from "../FormElements/DateTimeField";
import CheckboxGroup from "../FormElements/CheckboxGroup";
import CheckboxSingle from "../FormElements/CheckboxSingle";

const FormGroup = (props: any) => {
  const { item, control, errors, setValue, dropzoneData, setdropzoneData } =
    props;
  return (
    <>
      {item.type == "input" && (
        <div
          className={`${item.colWidth ? item.colWidth : ""} ${
            item.customClass || ""
          } col_12`}
        >
          <div
            className={`form-group ${props.modifier || ""} ${
              errors[`${item.name}`] ? "border-red" : ""
            } ${item.hidden ? "hidden-input" : ""}`}
          >
            <InputField
              name={item.name}
              control={control}
              placeholder={item.placeholder || ""}
              label={item.label || ""}
              type={item.inputtype || ""}
              class={item.exclass || ""}
              eye={item.eye}
              req={item.req}
              editEnable={item.editEnable}
              readOnly={item.readOnly}
              hasCheckbox={item.hasCheckbox}
              checkboxLabel={item.checkboxLabel}
            />
            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
            {item.bottomAnchor && (
              <div className="anchorWrapper d-flex justify-end mt-11">
                <Link href={item.bottomAnchorLink} className=" black-col">
                  {item.bottomAnchor}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {item.type == "tel" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div
            className={`form-group ${props.modifier || ""} ${
              errors[`${item.name}`] ? "border-red" : ""
            }`}
          >
            <InputPhone
              name={item.name}
              control={control}
              placeholder={item.placeholder || ""}
              label={item.label || ""}
              class={item.exclass || ""}
              req={item.req}
              country={item.country}
            />

            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}
      {item.type == "textarea" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div
            className={`form-group ${
              errors[`${item.name}`] ? "border-red" : ""
            } `}
          >
            <TextAreaField
              name={item.name}
              control={control}
              placeholder={item.placeholder || ""}
              label={item.label}
              class={item.exclass || ""}
              rows={item.rows}
              col={item.col}
              req={item.req}
            />
            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}
      {item.type == "file" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div
            className={`${
              errors[`${item.name}`] ? "border-red" : ""
            } form-group`}
          >
            <DropzoneField
              name={item.name}
              multiple={item.multiple}
              control={control}
              label={item.label}
              accept={item.accept}
              setValue={setValue}
              dropzoneData={dropzoneData}
              setdropzoneData={item.setdropzoneData}
              req={item.req}
              onChange={item.onChange}
              value={item.value}
              bottomLabel={item.bottomLabel}
              uploadLabel={item.uploadLabel}
            />

            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}
      {item.type == "radio" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div className={`form-group`}>
            <RadioGroup
              name={item.name}
              control={control}
              options={item.options}
              onChange={item.onChange}
              init={item.init}
              horizontal={item.horizontal}
              label={item.label}
              req={item.req}
            />
            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}
      {item.type == "select" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div
            className={`form-group ${
              errors[`${item.name}`] ? "border-red" : ""
            } `}
          >
            <SelectField
              name={item.name}
              control={control}
              label={item.label}
              placeholder={item.placeholder || ""}
              // options={item.options.map((x: any) => ({
              //   label: x.name || x.locationName || x.timeZoneName,
              //   value: x.id || x.recId,
              // }))}
              options={
                Array.isArray(item?.options)
                  ? item.options.map((x: any) => {
                      return {
                        label: x.name || x.locationName || x.timeZoneName,
                        value: x.id || x.recId || x.recId,
                      };
                    })
                  : []
              }
              exclass={item.exclass}
              error={errors[`${item.name}`]}
              disabled={item.disabled}
              onChange={item.onChange}
              // onChange={(selectedOption: any) => {
              //   setValue(item.name, {
              //     value: selectedOption.value,
              //     label: selectedOption.label,
              //   });
              // }}
              multiSelect={item.multiSelect}
              req={item.req}
            />
            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}

      {item.type == "date" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div
            className={`form-group ${
              errors[`${item.name}`] ? "border-red" : ""
            } `}
          >
            <DateTimeField
              name={item.name}
              control={control}
              label={item.label}
              placeholder={item.placeholder || ""}
              error={errors[`${item.name}`]}
              req={item.req}
              dateOption={item.dateOption}
              timeOption={item.timeOption}
            />
            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}
      {item.type == "checkboxGroup" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div className="form-group">
            <CheckboxGroup
              name={item.name}
              control={control}
              options={item.options}
              label={item.label}
            />
            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}
      {item.type == "checkboxSingle" && (
        <div className={`${item.colWidth ? item.colWidth : ""} col_12`}>
          <div className="form-group">
            <CheckboxSingle
              name={item.name}
              control={control}
              label={item.label}
            />
            {errors[`${item.name}`] && (
              <span className="error">{errors[`${item.name}`]?.message}</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FormGroup;
