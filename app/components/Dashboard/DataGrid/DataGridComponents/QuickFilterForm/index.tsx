"use client";

import { Fragment } from "react";
import { useForm } from "react-hook-form";
import FormGroup from "@/app/components/General/FormGroup";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";

import style from "./index.module.scss";

const formFields = [
  {
    type: "input",
    name: "keyword",
    placeholder: "Filter any column...",
    inputtype: "text",
    exclass: "sm",
  },
];
const init = {
  keyword: "",
};

export interface QuickFilterFormProps {
  onSubmit: any;
  defaultValue: any;
}

const QuickFilterForm = ({ onSubmit, defaultValue }: QuickFilterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue ?? init,
  });

  return (
    <>
      <form
        className={style.formContainer}
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        {formFields.map((item, i) => (
          <Fragment key={i}>
            <div className={`${style.searchInput} no-gutters`}>
              <FormGroup
                item={item}
                control={control}
                errors={errors}
                modifier="no-mb"
              />
            </div>
          </Fragment>
        ))}

        <PrimaryAnchor
          type="submit"
          title="Filter"
          variant="grey__btn"
          customClass="filterBtn"
        />
      </form>
    </>
  );
};

export default QuickFilterForm;
