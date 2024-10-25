import Image from "next/image";

import style from "./NoRecordFound.module.scss";

const NoRecordFound = ({ title, height, customClass }: any) => {
  return (
    <div className={`${style.container} ${height || ""} ${customClass || ""}`}>
      <div>
        <Image
          src="/assets/svgs/no-record-found.svg"
          alt="no record found"
          width={50}
          height={50}
        />
      </div>
      <p className={style.text}>{title || "Data not found"}</p>
    </div>
  );
};

export default NoRecordFound;
