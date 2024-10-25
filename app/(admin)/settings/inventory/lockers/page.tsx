"use client";

import PageTitle from "@/app/components/Inventory/PageTitle";
import DataGrid from "@/app/components/Dashboard/DataGrid";

import { lockers } from "@/app/data/dataGrid";

import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  negativeValueValidation,
  requiredValidation,
  mustBeAValidNumber,
} from "@/app/Utility/utility";
import { Fragment, useEffect, useState } from "react";
import Drawer from "@/app/components/General/Drawer";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";
import FormGroup from "@/app/components/General/FormGroup";
import {
  useCreateLockerMutation,
  useDeleteLockerMutation,
  useEditLockerMutation,
  useGetAllResourcePriceDurationsQuery,
  useLockerByIdQuery,
} from "@/app/redux/reducers/LockersSlice/LockersApiSlice";
import { useLocationListingQuery } from "@/app/redux/reducers/LocationsSlice/LocationsApiSlice";

import { getApiData } from "@/app/Utility/apiFunctions";
import { Pagination } from "@/app/Utility/commonTypes";
import { StatusComp } from "@/app/components/Dashboard/DataGrid/DataGridComponents";
import { CustomCellRendererProps } from "ag-grid-react";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";

import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";
import Alert from "@/app/components/Alert";
import { useFloorPlanListingQuery } from "@/app/redux/reducers/FloorPlanSlice/FloorPlanApiSlice";
import InputField from "@/app/components/General/FormElements/InputField";
import Feedback from "@/app/components/Feedback";

const LockerPage = () => {
  const [addDrawer, setAddDrawer] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [recId, setRecId] = useState(null);
  const [getRowData, setGetRowData] = useState([]);
  const [globalAppendableQuery, setGlobalAppendableQuery] = useState({});
  const [quickFilerText, setQuickFilerText] = useState({ keyword: "" });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<
    "success" | "failed" | "warning"
  >("success");

  const [DeleteLocker] = useDeleteLockerMutation();

  const {
    data: ResoursePriceDuration,
    error: ResoursePriceDurationError,
    isLoading: ResoursePriceDurationLoading,
    refetch: refetchResoursePriceDuration,
  } = useGetAllResourcePriceDurationsQuery();

  const {
    data: Locations,
    error: locationError,
    isLoading: locationLoading,
    refetch: refetchLocations,
  } = useLocationListingQuery({ pageNumber: -1, pageSize: -1 });

  const {
    data: Floors,
    error: floorsError,
    isLoading: floorsLoading,
    refetch: refetchFloors,
  } = useFloorPlanListingQuery({ pageNumber: -1, pageSize: -1 });

  const [createLocker, { isLoading: loading }] = useCreateLockerMutation();

  const [editLockerApi, { isLoading: editLoading }] = useEditLockerMutation();

  let init: any = {
    location: null,
    floor: null,
    lockers: null,
    description: "",
  };

  const schema = yup.object({
    location: yup
      .object({
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    floor: yup
      .object({
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    lockers: yup
      .number()
      .typeError(mustBeAValidNumber)
      .min(1, negativeValueValidation)
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required(requiredValidation),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: init,
    resolver: yupResolver(schema),
  });

  let formFields: any = [
    {
      type: "select",
      name: "location",
      label: "Location",
      placeholder: "Select Location",
      multiSelect: false,
      colWidth: "col_md_6",
      options: Locations?.data?.locations ? Locations?.data?.locations : [],
    },
    {
      type: "select",
      name: "floor",
      label: "Floor",
      placeholder: "Select Floor",
      multiSelect: false,
      colWidth: "col_md_6",
      options: Floors?.data?.floors ? Floors?.data?.floors : [],
    },
    {
      type: "input",
      name: "lockers",
      placeholder: "Enter Lockers",
      label: "Number of Lockers",
      inputtype: "number",
      readOnly: recId ? true : false,
    },
    {
      type: "textarea",
      name: "description",
      placeholder: "Write Description here",
      label: "Description",
      rows: 6,
      req: false,
    },
  ];

  const { fields, append } = useFieldArray<any>({
    control,
    name: "priceDuration",
    defaultValue: [],
  });

  useEffect(() => {
    if (ResoursePriceDuration?.data) {
      ResoursePriceDuration?.data.map((item: any) => {
        if (!recId) {
          append({
            recId: item?.recId,
            priceDurationName: item?.name,
            value: "",
          });
        }
      });
    }
  }, [ResoursePriceDuration]);

  const onSubmit = async (val: any) => {
    setRefreshData((prev) => !prev);
    try {
      const lockerRateList: any = [];

      val.priceDuration.forEach((item: any) => {
        if (item.value) {
          lockerRateList.push({
            fkResourceId: item.recId,
            key: item.priceDurationName,
            value: item.value,
          });
        }
      });

      const updateLockerRateList: any = [];

      getRowData?.data?.lockerRateList.forEach((item: any) => {
        if (item.value) {
          lockerRateList.push({
            fkResourceId: item.recId,
            key: item.priceDurationName,
            value: item.value,
          });
        }
      });

      const body: any = {
        description: val.description,
        floorId: val.floor.value,
        locationId: val.location.value,
        no_Of_Lockers: val.lockers,
        lockerRateList,
      };
      const updateBody: any = {
        recId: recId,
        description: val.description,
        floorId: val.floor.value,
        locationId: val.location.value,
        no_Of_Lockers: val.lockers,
        name: getRowData?.data?.name,
        availibility: getRowData?.data?.availibility,
        resourceTypeId: getRowData?.data?.resourceTypeId,
        lockerRateList: updateLockerRateList,
      };

      if (recId) {
        body.recId = recId;
        const res = await editLockerApi(updateBody);
        if (res?.data?.success) {
          setShowAlert(true);
          setRecId(null);
          setAlertMessage(res?.data?.message);
          setRefreshData((prev) => !prev);
          setTimeout(() => {
            setShowAlert(false);
            setAddDrawer(false);
          }, 4000);
        }
      } else {
        const res = await createLocker(body);
        if (res?.data?.success) {
          setShowAlert(true);
          setAlertMessage(res?.data?.message);
          setRefreshData((prev) => !prev);
          setTimeout(() => {
            setShowAlert(false);
            setAddDrawer(false);
          }, 4000);
        }
      }
      reset();
    } catch (error) {
      console.error("Something went wrong");
    }
  };

  const getLockers = async (query?: Pagination) => {
    try {
      query = {
        ...query,
        ...globalAppendableQuery,
      };
      const data = {
        version: "1",
        path: "Locker",
        endpoint: "get-all-lockers",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      return {
        data: IncomingData?.data?.lockers ?? [],
        totalCount:
          IncomingData?.data?.totalCount ??
          IncomingData?.data?.lockers.length ??
          0,
      };
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const dataFilterFunction = async (data: any) => {
    setGlobalAppendableQuery({ keyword: data.keyword });
    setQuickFilerText({ keyword: data.keyword });
    setRefreshData((prev) => !prev);
  };

  const columnsData = [
    {
      field: "location",
    },
    {
      field: "floor",
    },
    {
      field: "name",
    },
    {
      field: "availibility",
      headerName: "Availability",
      cellRenderer: StatusComp,
    },
    {
      field: "action",
      maxWidth: 120,
      filter: false,
      cellStyle: {
        justifyContent: "center",
      },
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <ActionsDropdown
            rowData={params}
            actionItems={[
              {
                label: "Edit",
                hasAction: true,
                onClick: (rowData: any) => {
                  setGetRowData(rowData);
                  let locationObj = {
                    label: rowData?.data?.location,
                    value: rowData?.data?.locationId,
                  };
                  let floorObj = {
                    label: rowData?.data?.floor,
                    value: rowData?.data?.floorId,
                  };
                  setRecId(rowData?.data?.recId);
                  let customizeArr: any = [];
                  rowData.data?.lockerRateList.map((item: any) => {
                    if (
                      rowData?.data?.lockerRateList.find(
                        (x: any) => x?.fkResourcePriceDurationId === item?.recId
                      )
                    ) {
                      let rec = rowData?.data?.lockerRateList.find((x: any) =>
                        console.log(x, "xxx")
                      );
                      customizeArr.push({
                        recId: item.recId,
                        priceDurationName: item.name,
                        value: rec.value,
                      });
                    } else {
                      customizeArr.push({
                        recId: item.recId,
                        priceDurationName: item.key,
                        value: item.value,
                      });
                    }
                  });

                  setValue("location", locationObj);
                  setValue("lockers", rowData?.data?.no_Of_Lockers);
                  setValue("floor", floorObj);
                  setValue("description", rowData?.data?.description);
                  setValue("priceDuration", customizeArr);

                  setAddDrawer(true);
                },
                icon: edit,
              },
              {
                label: "Delete",
                hasAction: true,
                icon: deleteIcon,
                onClick: (rowData: any) => {
                  setShowAlert(true);
                  setAlertVariant("success");
                  setAlertMessage("Delete Successfully");
                  setRefreshData((prev) => !prev);
                  DeleteLocker(rowData.data.recId);
                  setShowAlert(false);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <PageTitle
        title="Easily manage multiple lockers from a single dashboard."
        btnLabel={"Add Locker"}
        onClick={() => {
          setAddDrawer(true);
        }}
      />

      <DataGrid
        dataFilterFunction={dataFilterFunction}
        columnData={columnsData}
        fetchData={getLockers}
        key={Number(refreshData)}
        pagination={true}
        quickFilerText={quickFilerText}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          isOpen={addDrawer}
          setOpen={setAddDrawer}
          title={recId ? "Update Locker" : "Add Locker"}
          footer={
            !showAlert && (
              <div className="d-flex align-items-center justify-end column-gap-18">
                <PrimaryAnchor
                  type="button"
                  title="Cancel"
                  variant="secondary__btn"
                  disabled={loading ? true : false}
                  func={() => {
                    setAddDrawer(false);
                  }}
                />
                <PrimaryAnchor
                  spinnerClass="sm"
                  title="Save Changes"
                  isLoading={loading}
                  type="submit"
                />
              </div>
            )
          }
        >
          {!showAlert ? (
            <>
              {/* {showAlert && (
                <div className="mt-40">
                  <Alert
                    message={alertProps.message}
                    variant={alertProps.variant}
                    onClose={closeAlert}
                  />
                </div>
              )} */}
              <div className="custom-row">
                {formFields.map((item: any, i: number) => {
                  return (
                    <Fragment key={i}>
                      <FormGroup
                        item={item}
                        control={control}
                        errors={errors}
                      />
                    </Fragment>
                  );
                })}
                {fields.map((field: any, i: number) => {
                  return (
                    <Fragment key={field.id}>
                      <div className={`col_4`}>
                        <div className={`form-group`}>
                          {/* <span>{field.priceDurationName}</span> */}
                          <InputField
                            name={`priceDuration[${i}].value`}
                            control={control}
                            placeholder={"Price"}
                            label={field.priceDurationName}
                            type={"text"}
                          />
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </>
          ) : (
            <Feedback
              title="Success"
              description={alertMessage}
              customClass="drawerFeedback"
            />
          )}
        </Drawer>
      </form>
    </>
  );
};

export default LockerPage;
