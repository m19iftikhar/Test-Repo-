import Image from "next/image";
import checked from "../../../../../../public/assets/svgs/checked.svg";

const Checkbox = (props: any) => {
  return (
    <label className="checkbox">
      <div className="inputWrapper">
        <input
          type="checkbox"
          value={props.value}
          {...props.field}
          checked={props.field.value.includes(props.value)}
          onChange={() => {
            const newValue = props.field.value.includes(props.value)
              ? props.field.value.filter((v: any) => v !== props.value)
              : [...props.field.value, props.value];
            props.field.onChange(newValue);
          }}
        />
        <div className="customCheckbox">
          <Image src={checked.src} width={9} height={7} alt="icon" />
        </div>
      </div>
      <p>{props.label}</p>
    </label>
  );
};

export default Checkbox;
