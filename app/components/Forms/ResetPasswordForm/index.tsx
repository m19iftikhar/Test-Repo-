"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "../../General/FormGroup";
import {
  requiredValidation,
  passwordMatchValidation,
} from "../../../Utility/utility";
import Image from "next/image";
import { MINUTES, OTP_DIGITS } from "@/app/Utility/constants";
import {
  useForgetPasswordMutation,
  useForgetPasswordOtpMutation,
  useUpdateForgetPasswordMutation,
} from "@/app/redux/reducers/UserSlice/UserApiSlice";
import Alert from "../../Alert";
import Spinner from "../../Spinner";

export interface ResetPasswordFormProps {
  resetPassword: any;
  setResetPassword: any;
}

// Form Fields
const formfields = [
  {
    type: "input",
    name: "password",
    placeholder: "Enter your password",
    label: "New Password",
    inputtype: "password",
    eye: true,
    req: true,
  },
  {
    type: "input",
    name: "confirm",
    placeholder: "Enter your confirm password",
    label: "Confirm new password",
    inputtype: "password",
    eye: true,
    req: true,
  },
];

// Forms Fields Initial Values
const init = {
  password: "",
  confirm: "",
};

const ResetPasswordForm = ({
  resetPassword,
  setResetPassword,
}: ResetPasswordFormProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [passwordOtp, setPasswordOtp] = useState("");
  const [otpVerify, setOtpVerify] = useState(false);
  const [otpMounted, setotpMounted] = useState(false);
  const [time, setTime] = useState(MINUTES * 60);
  const [forgetPasswordOtpApi, { isLoading }] = useForgetPasswordOtpMutation();
  const [updateForgetPasswordApi, { isLoading: loadingPassword }] =
    useUpdateForgetPasswordMutation();
  const [resendOtpApi, { isLoading: loadingResendOtp }] =
    useForgetPasswordMutation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<
    "success" | "failed" | "warning"
  >("success");

  useEffect(() => {
    setotpMounted(true);
  }, []);

  const schema = yup
    .object({
      password: yup
        .string()
        .required(requiredValidation)
        .matches(
          /^(?=.*[a-zA-Z])(?=(.*\d.*\d))(?!.*\s)(?=.*[!@#\$%\^&\*])(?=.{8,64})/,
          "Password must be 8+ characters with letters, 2 digits min, and 1 special character."
        ),
      confirm: yup
        .string()
        .required("This is a required field")
        .oneOf([yup.ref("password")], passwordMatchValidation),
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

  useEffect(() => {
    {
      otp.length == OTP_DIGITS ? setOtpVerify(true) : setOtpVerify(false);
    }
  }, [otp]);

  const handleOtpSubmit = async (otp: string, e: any) => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        return;
      }
      const res = await forgetPasswordOtpApi({ email, otp }).unwrap();

      if (res?.success) {
        setShowAlert(true);
        setAlertMessage(res?.message);

        if (res?.statusCode === 200) {
          setAlertVariant("success");
          setPasswordOtp(res.data.otp);

          setTimeout(() => {
            setResetPassword(true);
            setShowAlert(false);
            setAlertMessage("");
          }, 500);
        } else {
          setAlertVariant("warning");
        }
      } else {
        setShowAlert(true);
        setAlertMessage(res?.message);
        setAlertVariant("failed");
        console.log(res);
      }

      // TODO: toast
    } catch (error: any) {
      setShowAlert(true);
      setAlertMessage(error?.data?.message);
      setAlertVariant("failed");
    }
  };

  const onSubmit = async (val: any) => {
    try {
      const res = await updateForgetPasswordApi({
        password: val.password,
        otp: passwordOtp,
      }).unwrap();

      if (res?.success) {
        setShowAlert(true);
        setAlertMessage(res?.message);
        if (res.statusCode === 200) {
          setAlertVariant("success");
          setTimeout(() => {
            router.push("/login");
          }, 500);
        } else {
          setAlertVariant("warning");
        }
      } else {
        setShowAlert(true);
        setAlertMessage(res?.message);
        setAlertVariant("failed");
        console.log(res);
      }
    } catch (error: any) {
      setShowAlert(true);
      setAlertMessage(error?.data?.message);
      setAlertVariant("failed");
    }
  };

  useEffect(() => {
    if (time > 0) {
      const timerId = setTimeout(() => setTime(time - 1), 1000); // Schedule the next countdown tick
      return () => clearTimeout(timerId); // Cleanup timeout on component unmount or before the next tick
    }
  }, [time]);

  // Convert time from seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const resendOtp = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        return;
      }
      const res = await resendOtpApi(email).unwrap();

      if (res?.success) {
        setTime(MINUTES * 60);
        setOtp("");
        setShowAlert(true);
        setAlertMessage(res?.message);
        setAlertVariant("success");
      } else {
        setShowAlert(true);
        setAlertMessage(res?.message);
        setAlertVariant("failed");
        console.log(res);
      }

      setShowAlert(false);

      // TODO: toast
    } catch (error: any) {
      setShowAlert(true);
      setAlertMessage(error?.data?.message);
      setAlertVariant("failed");
    }
  };

  return (
    <>
      {!resetPassword ? (
        <div className="otpVerify">
          {showAlert && (
            <Alert
              message={alertMessage}
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
            />
          )}
          {otpMounted && (
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={OTP_DIGITS}
              renderInput={(props: any) => (
                <input disabled={time === 0} {...props} />
              )}
              inputStyle={"otpInputStyle"}
              inputType="tel"
            />
          )}

          <button
            disabled={isLoading || loadingResendOtp}
            type="submit"
            className={`submitBtn ${
              !otpVerify || time === 0 || isLoading || loadingResendOtp
                ? "disabled"
                : ""
            }`}
            onClick={(e) => handleOtpSubmit(otp, e)}
          >
            {!isLoading ? "Verify" : <Spinner className="sm" />}
          </button>
          <div className="resendBtnWrapper">
            {time !== 0 ? (
              <span className="timer h3">{formatTime(time)}</span>
            ) : (
              <div className="resendBtn">
                <span>Didn’t you receive OTP?&nbsp;</span>
                <button
                  disabled={isLoading || loadingResendOtp}
                  type="button"
                  onClick={resendOtp}
                >
                  <div className="resendBtnText">
                    Resend OTP {loadingResendOtp && <Spinner className="sm" />}
                    <Image
                      className="bottomAnchorArrow"
                      src={"/assets/svgs/back-arrow.svg"}
                      width={18}
                      height={12}
                      alt="arrow"
                    />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loginFormWrapper">
          {showAlert && (
            <Alert
              message={alertMessage}
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
            />
          )}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="custom-row">
              {formfields.map((item, i) => (
                <Fragment key={i}>
                  {/* <div className="col_12"> */}
                  <FormGroup item={item} control={control} errors={errors} />
                  {/* </div> */}
                </Fragment>
              ))}
            </div>
            <button
              disabled={loadingPassword}
              type="submit"
              className={`submitBtn auth-form m-0 ${
                loadingPassword ? "disabled" : ""
              }`}
            >
              {!loadingPassword ? (
                "Create Password"
              ) : (
                <Spinner className="sm" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPasswordForm;
