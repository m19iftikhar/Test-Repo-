"use client";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "../../General/FormGroup";
import { useRouter } from "next/navigation";
import { emailValidation, requiredValidation } from "../../../Utility/utility";
import PrimaryAnchor from "../../General/Buttons/PrimaryAnchor";
import { signIn } from "next-auth/react";
import Spinner from "../../Spinner";
import Alert from "../../Alert";

const formfields = [
  {
    type: "input",
    name: "email",
    placeholder: "Enter your email address",
    label: "Email address",
    inputtype: "text",
    req: true,
  },
  {
    type: "input",
    name: "password",
    placeholder: "Enter your password",
    label: "Password",
    inputtype: "password",
    eye: true,
    bottomAnchor: "Forgot Password?",
    bottomAnchorLink: "/forgot-password",
    req: true,
  },
];
const init = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<
    "success" | "failed" | "warning"
  >("success");

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const sessionResponse = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });
      if (sessionResponse?.ok) {
        setShowAlert(true);
        setAlertMessage("Login Successful!");
        setAlertVariant("success");
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      } else {
        setShowAlert(true);
        setAlertMessage("Incorrect Credentials!");
        setAlertVariant("failed");
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage("Login Failure!");
      setAlertVariant("failed");
    } finally {
      setLoading(false);
    }
  };
  const schema = yup
    .object({
      email: yup.string().email(emailValidation).required(requiredValidation),
      password: yup.string().required(requiredValidation),
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
            disabled={loading}
            type="submit"
            className={`submitBtn auth-form ${loading ? "disabled" : ""}`}
          >
            {!loading ? "Sign In" : <Spinner className="sm" />}
          </button>
        </form>
        <div className="optionalLinkWrapper">
          <div className="optionalLinkTitleWrapper">
            <h3 className="optionalLinkTitle h4">OR</h3>
          </div>
          <PrimaryAnchor
            type="link"
            href="#"
            size="full"
            variant="outlined__black"
            title="Sign in with Active Directory"
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
