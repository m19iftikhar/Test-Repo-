"use client";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "../../General/FormGroup";
import { useRouter } from "next/navigation";
import { emailValidation, requiredValidation } from "../../../Utility/utility";
import { useForgetPasswordMutation } from "@/app/redux/reducers/UserSlice/UserApiSlice";
import Alert from "../../Alert";
import Spinner from "../../Spinner";
const formfields = [
  {
    type: "input",
    name: "email",
    placeholder: "Enter your email address",
    label: "Email address",
    inputtype: "text",
    req: true,
  },
];
const init = {
  email: "",
};

const ForgotPasswordForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<
    "success" | "failed" | "warning"
  >("success");
  const router = useRouter();
  const schema = yup
    .object({
      email: yup.string().email(emailValidation).required(requiredValidation),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: init,
  });
  const [forgetPasswordApi, { isLoading }] = useForgetPasswordMutation();
  const onSubmit = async (val: any) => {
    try {
      const res = await forgetPasswordApi(val.email).unwrap();
      if (res?.success) {
        if (res.statusCode === 200) {
          localStorage.setItem("email", val.email);
          setShowAlert(true);
          setAlertMessage(res?.message);
          setAlertVariant("success");
          setTimeout(() => {
            router.push("/reset-password");
          }, 500);
        } else {
          setShowAlert(true);
          setAlertMessage(res?.message);
          setAlertVariant("warning");
        }
      } else {
        setShowAlert(true);
        setAlertMessage(res?.message);
        setAlertVariant("failed");
      }
    } catch (error: any) {
      setShowAlert(true);
      setAlertMessage(error?.data?.message);
      setAlertVariant("failed");
    }
  };

  return (
    <>
      <div className="loginFormWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          {showAlert && (
            <Alert
              message={alertMessage}
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
            />
          )}
          <div className="custom-row">
            {formfields.map((item, i) => (
              <Fragment key={i}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`submitBtn  ${isLoading ? "disabled" : ""}`}
          >
            {!isLoading ? "Reset password" : <Spinner className="sm" />}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
