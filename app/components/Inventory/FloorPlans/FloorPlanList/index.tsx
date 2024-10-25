import FloorPlanItem from "@/app/components/Inventory/FloorPlans/FloorPlanItem";

import style from "./floorPlan.module.scss";
import { useRemoveFloorPlanMutation } from "@/app/redux/reducers/FloorPlanSlice/FloorPlanApiSlice";
import NoRecordFound from "@/app/components/NoRecordFound";
import Spinner from "@/app/components/Spinner";
import Alert from "@/app/components/Alert";
import { useState } from "react";

interface FloorPlanListProps {
  data: any;
  setValue?: any;
  openDrawer?: () => void;
  key?: any;
  refetch?: () => void;
  isLoading: boolean;
}

const FloorPlanList: React.FC<FloorPlanListProps> = ({
  data,
  setValue,
  openDrawer,
  key,
  refetch,
  isLoading,
}) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  return (
    <>
      {isLoading && (
        <div className={style.fullSizeContainer}>
          <Spinner />
        </div>
      )}

      {!isLoading &&
        Array.isArray(data?.floors) &&
        data?.floors.length === 0 && (
          <div className={style.fullSizeContainer}>
            <div>
              <NoRecordFound title="No Floor Plans Found" />
            </div>
          </div>
        )}

      {Array.isArray(data?.floors) && data?.floors.length > 0 && !isLoading && (
        <div className={style.floorPlanContainer}>
          {data?.floors.map((floor: any) => {
            return (
              <FloorPlanItem
                key={floor?.recId}
                recId={floor?.recId}
                name={floor?.name}
                locationName={floor?.locationName}
                locationId={floor?.locationId}
                area={floor?.area}
                floor={floor.floor}
                totalDesks={floor?.totalDesks}
                image={floor?.image}
                isOpen={floor?.isOpen}
                setValue={setValue}
                openDrawer={openDrawer}
                refetch={refetch}
                onDeletion={(variant, message) => {
                  setAlert({
                    show: true,
                    variant,
                    message,
                  });

                  setTimeout(() => {
                    setAlert({
                      show: false,
                      variant: "",
                      message: "",
                    });
                  }, 3000);
                }}
              />
            );
          })}
        </div>
      )}

      {alert.show && (
        <Alert
          customClass="fixed-alert"
          message={alert?.message}
          variant={alert?.variant}
        />
      )}
    </>
  );
};

export default FloorPlanList;
