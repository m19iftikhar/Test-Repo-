import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Image from "next/image";

const DateTimeField = (props: any) => {
  const placeholder =
    props.dateOption && props.timeOption
      ? "Select Date and Time"
      : props.dateOption
      ? "Select Date"
      : props.timeOption
      ? "Select Time"
      : "";
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
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: any) => {
                field.onChange(date);
              }}
              timeCaption="time:"
              showTimeSelect={props.timeOption ? true : false}
              showTimeSelectOnly={
                props.timeOption && !props.dateOption ? true : false
              }
              customInput={
                <div className={`input date-input`}>
                  <span
                    className={`title ${
                      field.value ? "titleCol" : "placeholderCol"
                    } ${props.error ? "errorCol" : ""}`}
                  >
                    {field.value
                      ? props.dateOption && !props.timeOption
                        ? moment(field.value).format("MMM Do YYYY")
                        : props.timeOption && !props.dateOption
                        ? moment(field.value).format("hh:mm A")
                        : props.dateOption && props.timeOption
                        ? moment(field.value).format("MMM Do YYYY hh:mm A")
                        : "Select Date and Time"
                      : placeholder}
                  </span>
                  <div className="icon-wrapper">
                    {props.dateOption && (
                      <div className={`icon`}>
                        <Image
                          src="/assets/svgs/calender.svg"
                          width={18}
                          height={18}
                          alt="icon"
                        />
                      </div>
                    )}
                    {props.timeOption && (
                      <div className={`icon`}>
                        <Image
                          src="/assets/svgs/time.svg"
                          width={18}
                          height={18}
                          alt="icon"
                        />
                      </div>
                    )}
                  </div>
                </div>
              }
              closeOnScroll={true}
            />
          )}
        />
      </div>
    </div>
  );
};

export default DateTimeField;
