"use client";

import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

import PrimaryAnchor from "../Buttons/PrimaryAnchor";
import style from "./index.module.scss";
import NotificationPopup from "./NotificationPopup";
import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";
import Breadcrumb from "@/app/components/Breadcrumbs";
import SelectField from "@/app/components/General/FormElements/SelectField";

const Header = () => {
  const pathname = usePathname();

  const { control, watch } = useForm({
    defaultValues: {
      filter: {
        label: "Innovation One",
        value: "Innovation-One",
      },
    },
  });

  const filterOptions = [
    {
      label: "DIFC FinTech Hive",
      value: "DIFC-FinTech-Hive",
    },
    {
      label: "DIFC Innovation Hive",
      value: "DIFC-Innovation-Hive",
    },
    {
      label: "Innovation One",
      value: "Innovation-One",
    },
  ];

  return (
    <div className={style.main__wrapper}>
      <div className={style.title__wrapper}>
        <div>
          <Breadcrumb />
        </div>
      </div>
      <div className={style.options__wrapper}>
        <div className={style.col1}>
          {pathname === "/dashboard" && (
            <>
              <PrimaryAnchor
                title="Refresh"
                iconSize="md"
                type="button"
                func={() => {
                  return;
                }}
                icon="refresh"
                modifier="refresh__btn"
              />

              <div className={style.locationSelect}>
                <SelectField
                  name="filter"
                  onChange={() => {
                    console.log("value changes");
                  }}
                  icon="/assets/svgs/location.svg"
                  control={control}
                  options={filterOptions}
                  placeholder="Select"
                  customClass="header-location-select"
                />
              </div>
            </>
          )}
          <SearchBar />
          <NotificationPopup />
          <ProfileDropdown />
        </div>

        {/* <div className={style.col2}>
          <NotificationPopup />
          <ProfileDropdown />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
