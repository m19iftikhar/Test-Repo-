import Image from "next/image";

import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";

import style from "./Feedback.module.scss";

interface thankyouProps {
  title: string;
  description: string;
  buttonProps?: any;
  customClass?: string;
}

const Feedback = ({
  title,
  description,
  buttonProps,
  customClass,
}: thankyouProps) => {
  return (
    <div
      className={`${style.content} ${customClass ? style[customClass] : ""}`}
    >
      <Image
        src="/assets/images/thankyou.gif"
        alt="thankyou"
        width={260}
        height={156}
      />
      <h1>{title}</h1>
      <h4 className="secondary-col">{description}</h4>
      <PrimaryAnchor {...buttonProps} />
    </div>
  );
};

export default Feedback;
