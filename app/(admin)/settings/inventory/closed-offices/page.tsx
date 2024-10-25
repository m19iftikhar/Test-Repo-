"use client";

import PageTitle from "@/app/components/Inventory/PageTitle";
import DataGrid from "@/app/components/Dashboard/DataGrid";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requiredValidation } from "@/app/Utility/utility";
import Drawer from "@/app/components/General/Drawer";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";
import FormGroup from "@/app/components/General/FormGroup";
import {
  useAddClosedOfficeMutation,
  useClosedOfficesListingQuery,
  useEditClosedOfficeMutation,
  useRemoveClosedOfficeMutation,
} from "@/app/redux/reducers/ClosedOfficesSlice/ClosedOfficesApiSlice";
import { closedOffices } from "@/app/data/dataGrid";
import { Pagination } from "@/app/Utility/commonTypes";
import { getApiData } from "@/app/Utility/apiFunctions";
import { useLocationListingQuery } from "@/app/redux/reducers/LocationsSlice/LocationsApiSlice";
import { useFloorPlanListingQuery } from "@/app/redux/reducers/FloorPlanSlice/FloorPlanApiSlice";
import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";
import { CustomCellRendererProps } from "ag-grid-react";
import {
  DurationComp,
  ImageWithTextComp,
} from "@/app/components/Dashboard/DataGrid/DataGridComponents";
import { convertToDateTime } from "@/app/Utility/helperFunctions";
import Feedback from "@/app/components/Feedback";
import Alert from "@/app/components/Alert";

const ClosedOfficePage = () => {
  const [drawerAction, setDrawerAction] = useState("add");
  const [addDrawer, setAddDrawer] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1000);
  const [isLoading, setIsLoading]: any = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [recId, setRecId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({
    message: "",
    variant: "",
  });

  const [quickFilerText, setQuickFilerText] = useState({ keyword: "" });
  const [globalAppendableQuery, setGlobalAppendableQuery] = useState({});

  const getClosedOffices = async (query?: Pagination) => {
    try {
      query = {
        ...query,
        ...globalAppendableQuery,
      };
      const data = {
        version: "1",
        path: "ClosedOffice",
        endpoint: "get-all-closed-offices",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      return {
        data: IncomingData?.data?.closedOffices ?? [],
        totalCount:
          IncomingData?.data?.totalCount ??
          IncomingData?.data?.closedOffices?.length,
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

  const {
    data: Locations,
    error: locationError,
    isLoading: locationLoading,
    refetch: refetchLocations,
  } = useLocationListingQuery({ pageNumber: pageNumber, pageSize: pageSize });

  const {
    data: FloorPlans,
    error,
    isLoading: FloorPlansLoading,
    refetch: refetchFloorPlans,
  } = useFloorPlanListingQuery();

  useEffect(() => {
    if (FloorPlansLoading && locationLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [FloorPlansLoading, locationLoading]);

  const [AddClosedOffice] = useAddClosedOfficeMutation();
  const [EditClosedOffice] = useEditClosedOfficeMutation();
  const [DeleteClosedOffice] = useRemoveClosedOfficeMutation();

  const init = {
    name: "",
    location: null,
    floor: null,
    capacity: null,
    area: null,
    // plan: null,
    // price: null,
    // deposit: null,
    availableFrom: null,
    availableTo: null,
  };

  const schema: any = yup.object({
    name: yup.string().required(requiredValidation),
    location: yup
      .object({
        label: yup.string().required(requiredValidation),
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    floor: yup
      .object({
        label: yup.string().required(requiredValidation),
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    capacity: yup
      .number()
      .typeError("Capacity must be a number")
      .min(1, "Capacity must be at least 1")
      .required(requiredValidation),
    area: yup
      .number()
      .typeError("Area must be a number")
      .min(1, "Area must be at least 1")
      .required(requiredValidation),
    availableFrom: yup.date().required(requiredValidation),
    availableTo: yup.date().required(requiredValidation),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: init,
    resolver: yupResolver(schema),
  });

  const formFields = [
    {
      type: "input",
      name: "name",
      placeholder: "Name",
      label: "Name",
      inputtype: "text",
      colWidth: "col_md_6",
    },
    {
      type: "select",
      name: "location",
      label: "Location",
      placeholder: "Select Location",
      multiSelect: false,
      colWidth: "col_md_6",
      options: Locations?.data?.locations?.map((location: any) => {
        return {
          name: location?.locationName,
          id: location?.recId,
        };
      }),
    },
    {
      type: "select",
      name: "floor",
      label: "Floor",
      placeholder: "Select Floor",
      multiSelect: false,
      colWidth: "col_md_6",
      options: FloorPlans?.data?.floors?.map((floorPlan: any) => {
        return {
          name: floorPlan?.name,
          id: floorPlan?.recId,
        };
      }),
    },
    {
      type: "input",
      colWidth: "col_md_6",
      name: "capacity",
      placeholder: "Enter Capacity",
      label: "Capacity",
      inputtype: "number",
    },
    {
      type: "input",
      colWidth: "col_md_6",
      name: "area",
      placeholder: "Enter Area",
      label: "Area",
      inputtype: "number",
    },
    {
      type: "date",
      name: "availableFrom",
      placeholder: "Select Date",
      label: "Available From",

      dateOption: true,
      timeOption: false,
      colWidth: "col_md_6",
    },
    {
      type: "date",
      name: "availableTo",
      placeholder: "Select Date",
      label: "Available To",

      dateOption: true,
      timeOption: false,
      colWidth: "col_md_6",
    },
  ];

  const OpenAddDrawer = async () => {
    try {
      setDrawerAction("add");
      setAddDrawer(true);
      refetchFloorPlans();
      refetchLocations();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const onSubmit = async (val: any) => {
    try {
      setIsLoading(true);
      let payload: any = {
        resourceTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        locationId: val?.location?.value,
        floorId: val?.floor?.value,
        name: val?.name,
        capacity: val?.capacity,
        area: val?.area,
        availableFrom: val?.availableFrom,
        availableTo: val?.availableTo,
        location: val?.location?.label,
        floor: val?.floor?.label,
      };

      let res;
      if (recId) {
        payload.recId = recId;
        res = await EditClosedOffice(payload);
      } else {
        res = await AddClosedOffice(payload);
      }

      const { data: response, error } = res;
      if (response?.success) {
        if (showAlert) {
          setShowAlert(false);
          setAlertProps({
            message: "",
            variant: "",
          });
        }

        if (response?.statusCode === 200) {
          setRefreshData((prev) => !prev);
          setFeedback(response?.message);

          reset();

          setTimeout(() => {
            setFeedback(null);
            setAddDrawer(false);
          }, 3000);
        } else {
          setShowAlert(true);
          setAlertProps({
            variant: "failed",
            message: response?.message,
          });
        }
      } else {
        setShowAlert(true);
        setAlertProps({
          variant: "failed",
          message: "Please check all required fields",
        });
      }
      reset();
    } catch (error) {
      setShowAlert(true);
      setAlertProps({
        variant: "failed",
        message: "An unexpected error occurred, please try again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageTitle
        title="Easily manage multiple closed offices from a single dashboard."
        btnLabel="Add Closed Office"
        onClick={() => {
          OpenAddDrawer();
        }}
      />

      <DataGrid
        pagination
        key={Number(refreshData)}
        columnData={[
          {
            field: "name",
            headerName: "Name",
            minWidth: 203,
            cellRenderer: ImageWithTextComp,
          },
          {
            field: "location",
            minWidth: 178,
          },
          {
            field: "floor",
            minWidth: 178,
          },
          {
            field: "capacity",
            headerName: "Capacity",
            minWidth: 158,
          },
          {
            field: "area",
            headerName: "Area",
            minWidth: 158,
          },
          {
            field: "Availability",
            cellRenderer: DurationComp,
            minWidth: 131,
          },
          {
            field: "action",
            filter: false,
            maxWidth: 90,
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
                        let locationObj: any = {
                          label: rowData?.data?.location,
                          value: rowData?.data?.locationId,
                        };
                        let floorObj: any = {
                          label: rowData?.data?.floor,
                          value: rowData?.data?.floorId,
                        };
                        setRecId(rowData?.data?.recId);
                        setDrawerAction("edit");
                        setAddDrawer(true);
                        setValue("name", rowData?.data?.name);
                        setValue("capacity", rowData?.data?.capacity);
                        setValue("area", rowData?.data?.area);
                        setValue("location", locationObj);
                        setValue("floor", floorObj);
                        setValue("availableTo", rowData?.data?.availableTo);
                        setValue("availableFrom", rowData?.data?.availableFrom);
                      },
                      icon: edit,
                    },
                    {
                      label: "Delete",
                      hasAction: true,
                      icon: deleteIcon,
                      onClick: (rowData: any) => {
                        DeleteClosedOffice(rowData?.data?.recId).then(
                          (res: any) => {
                            if (res) {
                              setRefreshData((prev) => !prev);
                            }
                          }
                        );
                      },
                    },
                  ]}
                />
              );
            },
          },
        ]}
        fetchData={getClosedOffices}
        dataFilterFunction={dataFilterFunction}
        quickFilerText={quickFilerText}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          isOpen={addDrawer}
          setOpen={setAddDrawer}
          title={`${drawerAction === "edit" ? "Edit" : "Add"} Closed Office`}
          reset={reset}
          footer={
            <div className="d-flex align-items-center justify-end column-gap-18">
              <PrimaryAnchor
                type="button"
                title="Cancel"
                variant="secondary__btn"
                func={() => {
                  reset();
                  setAddDrawer(false);
                }}
              />
              <PrimaryAnchor type="submit" title="Save Changes" />
            </div>
          }
        >
          {!feedback ? (
            <>
              {showAlert && (
                <div className="mt-40">
                  <Alert
                    message={alertProps.message}
                    variant={alertProps.variant}
                  />
                </div>
              )}
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
              </div>
            </>
          ) : (
            <Feedback
              title="Success"
              description={feedback}
              customClass="drawerFeedback"
            />
          )}
          <div></div>
        </Drawer>
      </form>
    </div>
  );
};

export default ClosedOfficePage;
