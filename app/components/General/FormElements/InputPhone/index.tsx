import {Controller} from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const InputPhone = (props: any) => {
  return (
    <div className={"input-container"}>
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
      <div className={"input-wrapper"}>
        <Controller
          name={props.name}
          control={props.control}
          render={({field: {value, onChange}}) => {
            return (
              <>
                <PhoneInput
                  value={value}
                  countryCodeEditable={false}
                  onChange={(e) => {
                    e && onChange(e);
                    props.onChange && props.onChange(e);
                  }}
                  placeholder={props.placeholder}
                  country={props.country}
                  inputProps={{className: "input phone-flag"}}
                  buttonClass={"flag-button"}
                />
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default InputPhone;
