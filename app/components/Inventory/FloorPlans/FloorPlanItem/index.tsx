import Image from "next/image";
import { useState } from "react";

import style from "./floorPlanItem.module.scss";
import SvgComp from "@/app/components/General/SvgComp";
import Placeholder from "@/app/components/Placeholder";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";

import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";
import { set } from "react-hook-form";
import { useRemoveFloorPlanMutation } from "@/app/redux/reducers/FloorPlanSlice/FloorPlanApiSlice";

interface FloorPlanItemProps {
  recId: string;
  name: string;
  locationName: string;
  locationId: string;
  area: string | number;
  totalDesks: string;
  image: string;
  floor: string | number;
  isOpen: boolean;
  setValue?: any;
  openDrawer?: () => void | null;
  refetch?: () => void | null;
  onDeletion?: (variant: string, message: string) => void | null;
}

const FloorPlanItem = ({
  recId,
  name,
  locationName,
  locationId,
  area,
  totalDesks,
  image,
  isOpen,
  floor,
  setValue,
  openDrawer,
  refetch,
  onDeletion,
}: FloorPlanItemProps) => {
  const [DeleteFloorPlans, state] = useRemoveFloorPlanMutation();
  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        {image ? (
          <Image src={image} alt="floor plan" width={303} height={252} />
        ) : (
          <div className={style.placeholder}>
            <Placeholder />
          </div>
        )}
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.name}>{name}</h3>

        <ActionsDropdown
          rowData={{
            recId,
            name,
            locationName,
            locationId,
            area,
            floor,
            totalDesks,
            image,
            isOpen,
          }}
          actionItems={[
            {
              icon: edit,
              label: "Edit",
              hasAction: true,
              onClick: (params: any) => {
                if (openDrawer) {
                  openDrawer(); // Ensure that openDrawer is called
                }
                let LocationObj = {
                  label: locationName,
                  value: locationId,
                };

                setValue("name", name);
                setValue("recId", recId);
                setValue("location", LocationObj);
                setValue("floor", floor);
                setValue("area", area);
                setValue("uploadFile", image);
                setValue("isOpen", isOpen);
              },
            },
            {
              icon: deleteIcon,
              label: "Delete",
              hasAction: true,
              isDisabled: state?.isLoading,
              onClick: async (params: any) => {
                try {
                  const res = await DeleteFloorPlans(recId);

                  const { data } = res;
                  if (data?.success && data?.statusCode === 200) {
                    onDeletion?.("success", res?.data?.message);
                    if (refetch) {
                      refetch();
                    }
                  } else {
                    onDeletion?.("warning", "Something went wrong, try again!");
                  }
                } catch (error: any) {
                  onDeletion?.("failed", "Something went wrong");
                }
              },
            },
          ]}
          modifier={style.actions}
          customClass={style.dropdown}
          itemModifier={style.itemModifier}
        />
      </div>

      <div className={style.details}>
        <SvgComp src="/assets/svgs/location.svg" />
        <p>{locationName}</p>
      </div>

      <div className="d-flex align-item-center">
        <div className={style.details}>
          <SvgComp src="/assets/svgs/area.svg" />
          <p>{area}</p>
        </div>

        <div className={style.details}>
          <SvgComp src="/assets/svgs/items.svg" />
          <p>{totalDesks}</p>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanItem;
