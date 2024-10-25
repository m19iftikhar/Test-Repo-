"use client";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";
import FormGroup from "@/app/components/General/FormGroup";
import { emailValidation, requiredValidation } from "@/app/Utility/utility";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Form = () => {
  const init = {
    name: "",
    singleSelect: null,
    multiSelect: null,
    date: null,
    time: null,
    dateAndTime: null,
    checkbox: [],
  };

  const schema: any = yup.object({
    name: yup.string().required(requiredValidation),
    singleSelect: yup
      .object({
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    multiSelect: yup
      .array()
      .of(
        yup.object({
          value: yup.string().required(requiredValidation),
        })
      )
      .required(requiredValidation),
    date: yup.date().required(requiredValidation),
    time: yup.date().required(requiredValidation),
    dateAndTime: yup.date().required(requiredValidation),
    checkbox: yup
      .array()
      .min(1, requiredValidation)
      .required(requiredValidation)
      .nullable(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: init,
    resolver: yupResolver(schema),
  });
  const formFields = [
    {
      type: "input",
      name: "name",
      placeholder: "Enter your Name",
      label: "Name",
      inputtype: "text",
      req: true,
    },
    {
      type: "select",
      name: "singleSelect",
      label: "Select Single Field",
      placeholder: "Please Select One field",
      multiSelect: false,
      options: [
        {
          name: "Option 1",
          id: "Option 1",
        },
        {
          name: "Option 2",
          id: "Option 2",
        },
        {
          name: "Option 3",
          id: "Option 3",
        },
      ],
    },
    {
      type: "select",
      name: "multiSelect",
      label: "Select Multiple Field",
      placeholder: "Please Select Multiple field",
      multiSelect: true,
      options: [
        {
          name: "Option 1",
          id: "Option 1",
        },
        {
          name: "Option 2",
          id: "Option 2",
        },
        {
          name: "Option 3",
          id: "Option 3",
        },
      ],
    },
    {
      type: "date",
      name: "date",
      placeholder: "Enter your Date",
      label: "Date",
      req: true,
      dateOption: true,
      timeOption: false,
    },
    {
      type: "date",
      name: "time",
      placeholder: "Enter your time",
      label: "Time",
      req: true,
      dateOption: false,
      timeOption: true,
    },
    {
      type: "date",
      name: "dateAndTime",
      placeholder: "Enter your Date & Time",
      label: "Date and Time",
      req: true,
      dateOption: true,
      timeOption: true,
    },
    {
      type: "checkboxGroup",
      name: "checkbox",
      label: "Checkbox Group",
      options: [
        {
          id: "option1",
          name: "Option 1",
        },
        {
          id: "option2",
          name: "Option 2",
        },
        {
          id: "option3",
          name: "Option 3",
        },
      ],
      req: true,
    },
  ];

  const onSubmit = (val: any) => {
    console.log(val);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="custom-row">
          {formFields.map((item: any, i: number) => {
            return (
              <Fragment key={i}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            );
          })}
        </div>
        <PrimaryAnchor type="submit" title="Submit" />
      </form>
    </>
  );
};

export default Form;
