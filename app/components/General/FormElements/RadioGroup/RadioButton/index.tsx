
const RadioButton = (props: any) => {
    return (
        <label htmlFor={props.value} className={`inputRadio`}>
            <input
                ref={props.ref}
                name={props.name}
                id={props.value}
                type="radio"
                aria-label={props.label}
                onChange={() => props.onChange(props.value)}
                value={props.value}
                {...props}
                className={` ${props.classCustom}`}
            />
            <span className="radioBtn"></span>
            {props?.label && <p className="mb-0">{props.label}</p>}
        </label>
    );
};

export default RadioButton;
