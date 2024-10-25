import { Controller } from "react-hook-form";

const TextAreaField = (props: any) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { value, onChange } }) => {
                return (
                    <div
                        className={`input-container`}>
                        <label className={'label'}>
                            {props.label}
                            {props.req && <span className="required"> *</span>}
                        </label>
                        <div className={`input-wrapper`}>
                            <textarea
                                value={value}
                                placeholder={props.placeholder}
                                className={`input`}
                                readOnly={props.readOnly}
                                rows={props.rows}
                                cols={props.col}
                                onChange={(e) => {
                                    onChange(e);
                                    props.onChange && props.onChange(e);
                                }}
                            />
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default TextAreaField