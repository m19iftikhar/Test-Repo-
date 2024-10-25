import Link from "next/link";
import SvgComp from "../../General/SvgComp";
import style from "./index.module.scss";

import {inventory} from "@/app/data/inventory";

const InventoryListing = () => {
  return (
    <div className={style.main__wrapper}>
      {inventory.map((item, index: number) => {
        return (
          <div className={style.card} key={index}>
            <Link href={item.link}>
              <SvgComp src={item.icon} className={style.icon} />
              <h3 className={style.title}>{item.title}</h3>
              <h5 className="secondary-col fw-400 m-0 line-clamp-3">
                {item.description}
              </h5>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryListing;
