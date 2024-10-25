import Link from "next/link";
import style from "./index.module.scss";
import Image from "next/image";

type anchorProps = {
  link: string;
};

const RoundAnchor = ({link}: anchorProps) => {
  return (
    <Link href={link ? link : "#"} className={style.anchor__wrapper}>
      <Image src={"/assets/svgs/chevron.svg"} alt="svg" width={13} height={7} />
    </Link>
  );
};

export default RoundAnchor;
