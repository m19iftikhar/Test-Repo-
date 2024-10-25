import Alert from "@/app/components/Alert";

import LoginForm from "@/app/components/Forms/LoginForm";
import TwoColTemplate from "@/app/components/General/TwoColTemplate";

const Login = () => {
  return (
    <>
      <TwoColTemplate
        videoSrc={"/assets/videos/banner-video.mp4"}
        logoSrc={"/assets/svgs/brand-logo.svg"}
        formTitle={"Welcome to the Admin Portal"}
        formDesc={
          "Welcome to the DIFC Space Community Services Portal, your hub for all DIFC community services and resources."
        }
      >
        <LoginForm />
      </TwoColTemplate>
    </>
  );
};

export default Login;
