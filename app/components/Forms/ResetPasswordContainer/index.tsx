"use client";
import { useState } from "react";
import TwoColTemplate from "../../General/TwoColTemplate";
import ResetPasswordForm from "../ResetPasswordForm";

const ResetPasswordContainer = () => {
  const [resetpassword, setResetPassword] = useState<boolean>(false);
  return (
    <TwoColTemplate
      videoSrc={"/assets/videos/banner-video.mp4"}
      logoSrc={"/assets/svgs/brand-logo.svg"}
      formTitle={!resetpassword ? "OTP Verification" : "Create password"}
      formDesc={
        !resetpassword
          ? "Please enter the 6-digit OTP sent to your registered email address. We’ve sent a verification code to your email"
          : "Kindly create a new password."
      }
    >
      <ResetPasswordForm
        resetPassword={resetpassword}
        setResetPassword={setResetPassword}
      />
    </TwoColTemplate>
  );
};

export default ResetPasswordContainer;
