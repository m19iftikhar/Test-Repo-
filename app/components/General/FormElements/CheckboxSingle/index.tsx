import Image from "next/image";
import { Controller } from "react-hook-form";
import checked from "../../../../../public/assets/svgs/checked.svg";

const CheckboxSingle = (props: any) => {
  return (
    <div className="input-container">
      <div className="checkbox-wrapper">
        <Controller
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <>
              <label className={`checkbox singleCheckbox`}>
                <div className={`inputWrapper`}>
                  <input
                    id={props.name}
                    type="checkbox"
                    aria-label={props.label}
                    {...field}
                    value={props.value}
                    checked={field.value || false} // Ensure correct checked state
                  />
                  <div className={`customCheckbox`}>
                    <Image src={checked.src} width={9} height={7} alt="icon" />
                  </div>
                </div>
                <p>{props.label}</p>
              </label>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default CheckboxSingle;
