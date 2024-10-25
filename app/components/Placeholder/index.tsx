import Image from "next/image";

import style from "./Placeholder.module.scss";

interface PlaceholderProps {
  customClass?: string;
}

const Placeholder = ({ customClass }: PlaceholderProps) => {
  return (
    <div
      className={`${style.placeholder} ${
        customClass ? style[customClass] : ""
      }`}
    >
      <Image
        className={style.image}
        width={60}
        height={60}
        alt="logo"
        src="/assets/svgs/logo-gray.svg"
      />
    </div>
  );
};

export default Placeholder;
