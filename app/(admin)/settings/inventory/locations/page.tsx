"use client";

import { Fragment, useEffect, useState } from "react";

import DataGrid from "@/app/components/Dashboard/DataGrid";
import Drawer from "@/app/components/General/Drawer";
import PageTitle from "@/app/components/Inventory/PageTitle";

import { locations } from "@/app/data/dataGrid";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";
import FormGroup from "@/app/components/General/FormGroup";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requiredValidation } from "@/app/Utility/utility";
import {
  useAddLocationMutation,
  useDeleteLocationMutation,
  useEditLocationMutation,
  useLocationListingQuery,
} from "@/app/redux/reducers/LocationsSlice/LocationsApiSlice";
import { useTimeZoneListingQuery } from "@/app/redux/reducers/TimeZoneSlice/TimeZoneApiSlice";
import { getApiData } from "@/app/Utility/apiFunctions";
import { Pagination } from "@/app/Utility/commonTypes";
import { CustomCellRendererProps } from "ag-grid-react";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";
import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";
import { convertToDateTime } from "@/app/Utility/helperFunctions";
import Feedback from "@/app/components/Feedback";
import Alert from "@/app/components/Alert";
import { ImageWithTextComp } from "@/app/components/Dashboard/DataGrid/DataGridComponents";
// import "ag-grid-enterprise";
// import { LicenseManager } from "ag-grid-enterprise";

// LicenseManager.setLicenseKey(
//   "Using_this_{AG_Grid}_Enterprise_key_{AG-069569}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Digital_Gravity_Solution_LLC}_is_granted_a_{Multiple_Applications}_Developer_License_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{15_November_2025}____[v3]_[01]_MTc2MzE2NDgwMDAwMA==7f6c7223ab4682288a6572584247da48"
// );

const LocationsPage = () => {
  const [addLocationDrawer, setAddLocationDrawer] = useState(false);
  const [drawerAction, setDrawerAction] = useState("add");
  const [isLoading, setIsLoading]: any = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [recId, setRecId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({
    message: "",
    variant: "",
  });

  const [deleteAlert, setDeleteAlert] = useState({
    show: false,
    variant: "",
    message: "",
  });

  const [globalAppendableQuery, setGlobalAppendableQuery] = useState({});
  const [quickFilerText, setQuickFilerText] = useState({ keyword: "" });

  const [AddLocation] = useAddLocationMutation();
  const [EditLocation] = useEditLocationMutation();
  const [DeleteLocation] = useDeleteLocationMutation();

  const {
    data: TimeZonesData,
    error: TimeZoneListError,
    isLoading: TimeZoneLoading, // TODO: timezone loading need clarity on how this will affect the UI
    refetch: refetchTimeZone,
  } = useTimeZoneListingQuery();

  const init = {
    // location: null,
    locationName: "",
    hoursStart: null,
    hoursEnd: null,
    timeZoneName: null,
    uploadFile: "",
    description: "",
    isOpen: false,
  };

  const schema: any = yup.object({
    // location: yup
    //   .object({
    //     value: yup.string().required(requiredValidation),
    //   })
    //   .required(requiredValidation),

    locationName: yup.string().required(requiredValidation),
    hoursStart: yup.date().required(requiredValidation),
    hoursEnd: yup.date().required(requiredValidation),
    timeZoneName: yup
      .object({
        label: yup.string().required(requiredValidation),
        value: yup.string().required(requiredValidation),
      })
      .nullable()
      .required(requiredValidation),
    description: yup.string().required(requiredValidation),

    uploadFile: yup.string().required(requiredValidation),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: init,
    resolver: yupResolver(schema),
  });

  const getLocations = async (query?: Pagination) => {
    try {
      query = {
        ...query,
        ...globalAppendableQuery,
      };
      const data = {
        version: "1",
        path: "Location",
        endpoint: "get-all-locations",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      return {
        data: IncomingData?.data?.locations ?? [],
        totalCount: IncomingData?.data?.totalCount ?? 10,
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

  const getTimeZones = async () => {
    try {
      setDrawerAction("add");
      setAddLocationDrawer(true);
      refetchTimeZone();
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };
  const columnsData = [
    {
      field: "locationName",
      headerName: "Location",
      cellRenderer: ImageWithTextComp,
    },
    {
      field: "hoursStart",
      headerName: "Start Time",
    },
    {
      field: "hoursEnd",
      headerName: "End Time",
    },
    {
      field: "timeZoneName",
      headerName: "Time Zone",
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
                  let obj = {
                    label: rowData?.data?.timeZoneName,
                    value: rowData?.data?.timeZone,
                  };
                  setRecId(rowData?.data?.recId);
                  setDrawerAction("edit");
                  setAddLocationDrawer(true);
                  setValue("locationName", rowData?.data?.locationName);
                  setValue(
                    "hoursStart",
                    convertToDateTime(rowData?.data?.hoursStart)
                  );
                  setValue("description", rowData?.data?.description);
                  setValue(
                    "hoursEnd",
                    convertToDateTime(rowData?.data?.hoursEnd)
                  );
                  setValue("isOpen", rowData?.data?.isOpen);
                  if (rowData?.data?.timeZoneName) {
                    setValue("timeZoneName", obj);
                  } else {
                    setValue("timeZoneName", null); // Explicitly set to null if no value
                  }
                },
                icon: edit,
              },
              {
                label: "Delete",
                hasAction: true,
                icon: deleteIcon,
                onClick: async (rowData: any) => {
                  try {
                    const result = await DeleteLocation(rowData?.data?.recId);
                    console.log("result ============", result);
                    if (result?.success && result?.statusCode === 200) {
                      setDeleteAlert({
                        show: true,
                        variant: "success",
                        message: result?.message || "Success",
                      });
                      setRefreshData((prev) => !prev);
                    } else {
                      setDeleteAlert({
                        show: true,
                        variant: "failed",
                        message:
                          result?.error?.data?.message || "Deletion Failed",
                      });
                    }
                  } catch (error: any) {
                    setDeleteAlert({
                      show: true,
                      variant: "failed",
                      message:
                        error?.response?.data?.errors?.recId ||
                        "Something went wrong",
                    });
                  } finally {
                    setTimeout(() => {
                      setDeleteAlert({
                        show: false,
                        variant: "",
                        message: "",
                      });
                    }, 3000);
                  }
                },
              },
            ]}
          />
        );
      },
    },
  ];
  const formFields = [
    // {
    //   type: "select",
    //   name: "location",
    //   label: "Location",
    //   placeholder: "Select Location",
    //   multiSelect: false,
    //   colWidth: "col_md_6",

    //   options: [
    //     {
    //       name: "Location 1",
    //       id: "Location 1",
    //     },
    //     {
    //       name: "Location 2",
    //       id: "Location 2",
    //     },
    //     {
    //       name: "Location 3",
    //       id: "Location 3",
    //     },
    //   ],
    // },
    {
      type: "input",
      name: "locationName",
      placeholder: "Enter Location Name",
      label: "Name",
      inputtype: "text",
      colWidth: "col_md_6",
      req: true,
    },
    {
      type: "date",
      name: "hoursStart",
      placeholder: "Start Time",
      label: "Start Time",
      req: true,

      dateOption: false,
      timeOption: true,
      colWidth: "col_md_6",
    },
    {
      type: "date",
      name: "hoursEnd",
      placeholder: "End Time",
      label: "End Time",
      req: true,

      dateOption: false,
      timeOption: true,
      colWidth: "col_md_6",
    },
    {
      type: "select",
      name: "timeZoneName",
      label: "Time Zone",
      placeholder: "Select Time Zone",
      multiSelect: false,
      colWidth: "col_md_6",
      req: true,
      options: TimeZonesData?.data ?? [
        {
          name: "GMT +04:00 Asia/Dubai",
          id: "GMT +04:00 Asia/Dubai",
        },
        {
          name: "GMT +04:00 Pakistan",
          id: "GMT +04:00 Pakistan",
        },
      ],
    },
    // {
    //   type: "file",
    //   name: "uploadFile",
    //   multiple: false,
    //   accept: {
    //     "image/jpeg": [],
    //     "image/png": [],
    //   },
    //   uploadLabel: "Drop your files to upload here",
    //   bottomLabel:
    //     "The file size limit is 3MB. Please upload an image with exactly 600px by 600px.",
    // },
    {
      type: "file",
      name: "uploadFile",
      label: "Upload File",
      multiple: false,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      req: true,
      bottomLabel:
        "The file size limit is 2MB. Please upload an image with exactly 600px by 600px.",
      maxLimit: 2 * 1024 * 1024,
      maxLimitMessage: "File size exceeds 2MB. Please upload a smaller file.",
    },
    {
      type: "textarea",
      name: "description",
      placeholder: "Write Description here",
      label: "Description",
      rows: 4,
      req: true,
    },
    {
      type: "checkboxSingle",
      name: "isOpen",
      label:
        "Check if the location is operational and any data associated with it should be used for reports",
    },
  ];

  const onSubmit = async (val: any) => {
    try {
      setIsLoading(true);
      const startDate = new Date(val?.hoursStart);
      const startDateHours = startDate.getHours().toString().padStart(2, "0");
      const startDateMinutes = startDate
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const startTime = `${startDateHours}:${startDateMinutes}`;
      const endDate = new Date(val?.hoursEnd);
      const endDateHours = endDate.getHours().toString().padStart(2, "0");
      const endDateMinutes = endDate.getMinutes().toString().padStart(2, "0");
      const endTime = `${endDateHours}:${endDateMinutes}`;
      const data: any = {
        hoursEnd: startTime,
        hoursStart: endTime,
        locationName: val?.locationName,
        description: val?.description,
        isOpen: val?.isOpen,
        timeZoneName: val?.timeZoneName?.label,
        timeZone: val?.timeZoneName?.value,
        attachment: val?.uploadFile,
      };

      let res;
      if (recId) {
        data.recId = recId;
        res = await EditLocation(data);
        setRecId(null);
      } else {
        res = await AddLocation(data);
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
            setAddLocationDrawer(false);
          }, 3000);
        } else {
          setShowAlert(true);
          setAlertProps({
            variant: "failed",
            message: error?.data?.title || "Validation error",
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

  const closeAlert = () => {
    setShowAlert(false);
    setAlertProps({
      message: "",
      variant: "",
    });
  };

  const handleCancel = () => {
    setFeedback(null);

    if (showAlert) {
      closeAlert();
    }

    setAddLocationDrawer(false);
    reset();
  };

  return (
    <div>
      <PageTitle
        title="Easily manage multiple locations from a single dashboard."
        btnLabel="Add Location"
        onClick={() => {
          getTimeZones();
        }}
      />

      <DataGrid
        pagination={true}
        // rowsData={Locations?.data}
        dataFilterFunction={dataFilterFunction}
        columnData={columnsData}
        fetchData={getLocations}
        key={Number(refreshData)}
        quickFilerText={quickFilerText}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          isOpen={addLocationDrawer}
          setOpen={setAddLocationDrawer}
          title={`${drawerAction === "edit" ? "Edit" : "Add"} Location`}
          disableClose={isLoading}
          onClose={handleCancel}
          footer={
            !feedback && (
              <div className="d-flex align-items-center justify-end column-gap-18">
                <PrimaryAnchor
                  type="button"
                  title="Cancel"
                  disabled={isLoading}
                  variant="secondary__btn"
                  func={handleCancel}
                />
                <div className="drawerSubmit">
                  <PrimaryAnchor
                    type="submit"
                    spinnerClass="sm"
                    title="Save Changes"
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )
          }
        >
          {!feedback ? (
            <>
              {showAlert && (
                <div className="mt-40">
                  <Alert
                    message={alertProps.message}
                    variant={alertProps.variant}
                    onClose={closeAlert}
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
        </Drawer>
      </form>

      {/* delete alert */}
      {deleteAlert.show && (
        <Alert
          onClose={() => {
            setDeleteAlert({
              show: false,
              message: "",
              variant: "",
            });
          }}
          customClass="fixed-alert"
          message={deleteAlert?.message}
          variant={deleteAlert?.variant}
        />
      )}
    </div>
  );
};

export default LocationsPage;
