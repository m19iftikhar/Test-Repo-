"use client";

import { Fragment, useEffect, useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";

import Drawer from "@/app/components/General/Drawer";
import FormGroup from "@/app/components/General/FormGroup";
import DataGrid from "@/app/components/Dashboard/DataGrid";
import PageTitle from "@/app/components/Inventory/PageTitle";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";
import Feedback from "@/app/components/Feedback";
import Alert from "@/app/components/Alert";

import {
  negativeValueValidation,
  requiredValidation,
  mustBeAValidNumber,
} from "@/app/Utility/utility";
import { DropdownType, Pagination } from "@/app/Utility/commonTypes";
import { getApiData } from "@/app/Utility/apiFunctions";
import {
  useAllTaxeRatesQuery,
  useGetAllLocationsQuery,
  useGetAllResourcePriceDurationQuery,
} from "@/app/redux/reducers/MeetingRoomSlice/MeetingRoomApiSlice";
import {
  useAddEventSpaceMutation,
  useDeleteEventSpaceMutation,
  useEditEventSpaceMutation,
} from "@/app/redux/reducers/EventSpaceSlice/EventSpaceApiSlice";
import { Location } from "@/app/Utility/types/inventory";
import Image from "next/image";
import InputField from "@/app/components/General/FormElements/InputField";
import SelectField from "@/app/components/General/FormElements/SelectField";
import {
  ImageWithTextComp,
  StatusComp,
} from "@/app/components/Dashboard/DataGrid/DataGridComponents";
import { CustomCellRendererProps } from "ag-grid-react";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";
import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";

const EventSpacesPage = () => {
  const [addDrawer, setAddDrawer] = useState(false);
  const [taxRateId, setTaxRateId] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [refreshData, setRefreshData] = useState(false);
  const [recId, setRecId] = useState(null);
  const [colState, setCol] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [globalAppendableQuery, setGlobalAppendableQuery] = useState({});
  const [quickFilerText, setQuickFilerText] = useState({ keyword: "" });

  const [drawerAction, setDrawerAction] = useState("Add");
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

    setAddDrawer(false);
    reset();
  };

  const { data: taxes, isLoading: taxesLoading } = useAllTaxeRatesQuery();
  const { data: priceDurations, isLoading: priceLoading } =
    useGetAllResourcePriceDurationQuery();

  const { data: locations, isLoading: locationLoading } =
    useGetAllLocationsQuery();
  const [addEventApi, { isLoading: addLoading }] = useAddEventSpaceMutation();
  const [deleteEventApi, { isLoading: deleteLoading }] =
    useDeleteEventSpaceMutation();
  const [editEventApi, { isLoading: editLoading }] =
    useEditEventSpaceMutation();

  const init = {
    name: "",
    roomLocation: null,
    floor: null,
    capacity: null,
    // hourlyPrice: "",
    // halfDayPrice: "",
    // fullDayPrice: "",
    area: null,
    revenueAccount: null,
    taxRate: null,
    uploadFile: null,
    description: "",
    visibilityLevel: "",
    // location: null,
    // member: null,
    // plan: null,
    isOpen: false,
  };

  const schema: any = yup.object({
    name: yup.string().required(requiredValidation),
    roomLocation: yup
      .object({
        value: yup.string().required(requiredValidation),
        label: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    floor: yup
      .object({
        value: yup.string().required(requiredValidation),
        label: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    capacity: yup
      .number()
      .typeError(mustBeAValidNumber)
      .min(1, negativeValueValidation)
      .required(requiredValidation),
    // hourlyPrice: yup.string().required(requiredValidation),
    // halfDayPrice: yup.string().required(requiredValidation),
    // fullDayPrice: yup.string().required(requiredValidation),
    area: yup
      .number()
      .typeError(mustBeAValidNumber)
      .min(1, negativeValueValidation)
      .required(requiredValidation),
    revenueAccount: yup
      .object({
        value: yup.string().required(requiredValidation),
        label: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    taxRate: yup
      .object({
        value: yup.string().required(requiredValidation),
        label: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    uploadFile: yup.string().required(requiredValidation),
    description: yup.string().required(requiredValidation),
    visibilityLevel: yup.string().required(requiredValidation),
    isOpen: yup.boolean().required(requiredValidation),
    // location: yup.array().of(
    //   yup.object().shape({
    //     label: yup.string().required(),
    //     value: yup.string().required(),
    //   })
    // ),

    // member: yup.array().of(
    //   yup.object().shape({
    //     label: yup.string().required(),
    //     value: yup.string().required(),
    //   })
    // ),
    // plan: yup.array().of(
    //   yup.object().shape({
    //     label: yup.string().required(),
    //     value: yup.string().required(),
    //   })
    // ),
  });

  const taxRateOnChange = (data: DropdownType) => {
    setTaxRateId(data.value);
  };
  const locationOnChange = (data: DropdownType) => {
    setLocationId(data.value);
  };

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
  const initArr = {
    recId: "",
    priceDurationName: "",
    value: "",
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceDuration",
    defaultValue: [],
  });

  const formFields = [
    {
      type: "input",
      name: "name",
      placeholder: "Enter room name",
      label: "Name",
      inputtype: "text",
      req: true,
    },
    {
      type: "select",
      name: "roomLocation",
      label: "Select Location",
      placeholder: "Select Location",
      multiSelect: false,
      colWidth: "col_md_4",
      req: true,
      onChange: locationOnChange,
      options: locations?.data.locations
        ? locations.data?.locations.map((item: Location) => ({
            name: item.locationName,
            id: item.recId,
          }))
        : [],
    },
    {
      type: "select",
      name: "floor",
      label: "Floor",
      placeholder: "Select Floor",
      multiSelect: false,
      req: true,
      colWidth: "col_md_4",
      options:
        floorPlans.length > 0
          ? floorPlans.map((item: any) => ({
              name: item.name,
              id: item.recId,
            }))
          : [],
    },
    {
      type: "input",
      name: "capacity",
      placeholder: "Enter capacity",
      label: "Capacity",
      colWidth: "col_md_4",
      inputtype: "number",
      req: true,
    },
    {
      type: "input",
      name: "area",
      placeholder: "Enter area",
      label: "Area",
      inputtype: "number",
      req: true,
    },
    // {
    //   type: "input",
    //   name: "hourlyPrice",
    //   placeholder: "Enter hourly price",
    //   colWidth: "col_md_4",
    //   hasCheckbox: true,
    //   checkboxLabel: "Hourly Price in AED",
    //   label: "",
    //   inputtype: "text",
    // },
    // {
    //   type: "input",
    //   name: "halfDayPrice",
    //   placeholder: "Enter half day price",
    //   hasCheckbox: true,
    //   checkboxLabel: "Half Day Price in AED",
    //   colWidth: "col_md_4",
    //   label: "",
    //   inputtype: "text",
    // },
    // {
    //   type: "input",
    //   name: "fullDayPrice",
    //   placeholder: "Enter full day price",
    //   hasCheckbox: true,
    //   checkboxLabel: "Full Day Price in AED",
    //   colWidth: "col_md_4",
    //   label: "",
    //   inputtype: "text",
    // },
  ];
  const formFields2 = [
    {
      type: "select",
      name: "taxRate",
      label: "Tax Rate",
      placeholder: "Select Tax Rate",
      multiSelect: false,
      colWidth: "col_md_6",
      req: true,
      onChange: taxRateOnChange,
      options: taxes?.data
        ? taxes.data?.map((item: any) => ({
            name: item.name,
            id: item.recId,
          }))
        : [],
    },
    {
      type: "select",
      name: "revenueAccount",
      label: "Revenue Account",
      placeholder: "Select Revenue Account",
      multiSelect: false,
      colWidth: "col_md_6",
      req: true,
      options:
        revenues.length > 0
          ? revenues.map((item: any) => ({
              name: item.name,
              id: item.recId,
            }))
          : [],
    },
    {
      type: "file",
      name: "uploadFile",
      multiple: false,
      label: "Upload File",
      req: true,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      bottomLabel:
        "The file size limit is 10MB. Please upload an image with exactly 600px by 600px.",
      uploadLabel: "Drop your file to upload here",
    },
    {
      type: "textarea",
      name: "description",
      placeholder: "Write Description here",
      label: "Description",
      rows: 9,
      req: false,
    },
    {
      type: "radio",
      name: "visibilityLevel",
      req: true,
      label: "Visibility Level",
      horizontal: true,
      options: [
        {
          id: "full",
          name: "Full Access/Public",
        },
        {
          id: "active members",
          name: "Active Members",
        },
        {
          id: "plan",
          name: "Plan",
        },
      ],
    },
    {
      type: "checkboxSingle",
      name: "isOpen",
      label: "is Open",
    },
  ];

  useEffect(() => {
    const fetchRevenues = async () => {
      const query = {
        taxRateId,
        locationId,
      };
      try {
        const data = {
          path: "MeetingRoom",
          endpoint: "get-all-revenue-accounts",
          queryParams: query,
        };
        let IncomingData = await getApiData(data);
        setRevenues(IncomingData?.data ?? []);
      } catch (err) {
        console.error("An error:", err);
      }
    };
    const fetchFloors = async () => {
      const query = {
        locationId,
      };
      try {
        const data = {
          path: "Floor",
          endpoint: "get-all-floors",
          queryParams: query,
        };
        let IncomingData = await getApiData(data);
        setFloorPlans(IncomingData?.data?.floors ?? []);
      } catch (err) {
        console.error("An error:", err);
      }
    };

    if (taxRateId && locationId) {
      fetchRevenues();
    }
    if (locationId) {
      fetchFloors();
    }
  }, [taxRateId, locationId]);

  const onSubmit = async (val: any) => {
    console.log("🚀 ~ onSubmit ~ val:", val);
    try {
      const resourcePriceModelist: any = [];

      val.priceDuration.forEach((item: any) => {
        if (item.value) {
          resourcePriceModelist.push({
            fkResourcePriceDurationId: item.recId,
            value: item.value,
            isActive: true,
          });
        }
      });

      const body: any = {
        // visibilityLevel: val.visibilityLevel,
        capacity: val.capacity,
        name: val.name,
        area: val.area,
        isOpen: val.isOpen,
        description: val.description,
        // attachment: "", // val.uploadFile,
        taxRateId: val.taxRate.value,
        revenueAccountId: val.revenueAccount.value,
        floorId: val.floor.value,
        locationId: val.roomLocation.value,
        resourcePriceModelist,
      };
      console.log("🚀 ~ onSubmit ~ body:", body);

      let res;
      if (recId) {
        body.recId = recId;
        res = await editEventApi(body);
      } else {
        res = await addEventApi(body);
      }

      const { data: response, error } = res;

      if (response?.success && response?.statusCode === 200) {
        setFeedback(response?.message);
        reset();
        setRefreshData((prev) => !prev);
        setTimeout(() => {
          setFeedback(null);
          setAddDrawer(false);
          setShowAlert(false);
          setAlertProps({
            variant: "",
            message: "",
          });
        }, 3000);
      } else {
        setShowAlert(true);
        setAlertProps({
          variant: "failed",
          message: error?.data?.title || "Validation error",
        });
      }
    } catch (error) {
      setShowAlert(true);
      setAlertProps({
        variant: "failed",
        message: "An unexpected error occurred",
      });
    }
  };
  const getEvents = async (query?: Pagination) => {
    try {
      query = {
        ...query,
        ...globalAppendableQuery,
      };
      const data = {
        version: "1",
        path: "EventSpaces",
        endpoint: "get-all-event-spaces",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      let customData: any = [];
      IncomingData.data.eventSpaces.map((item: any) => {
        let data = item;
        item.resourcePriceModelist.map((x: any) => {
          data[x?.fkResourcePriceDurationId] = x?.value;
        });
        customData.push(data);
      });
      return {
        data: customData ?? [],
        totalCount: IncomingData?.data?.eventSpaces?.length,
        // IncomingData?.data?.totalCount ??
        // IncomingData?.data?.eventSpaces?.length ??
        // 0,
      };
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };
  const columnsData = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 260,
      cellRenderer: ImageWithTextComp,
    },
    {
      field: "locationName",
      minWidth: 160,
    },
    {
      field: "floorName",
      minWidth: 160,
    },
    {
      field: "capacity",
      maxWidth: 120,
    },
    {
      field: "area",
      maxWidth: 120,
    },
    {
      field: "status",
      maxWidth: 180,
      cellRenderer: StatusComp,
    },
  ];
  let action: any = {
    field: "action",
    filter: false,
    maxWidth: 120,
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
                console.log("row data", rowData.data);
                setDrawerAction("Edit");
                setRecId(rowData?.data?.recId);
                setLocationId(rowData?.data?.locationId);
                setTaxRateId(rowData?.data?.taxRateId);
                setAddDrawer(true);
                let customizeArr: any = [];
                priceDurations.data.map((item: any) => {
                  if (
                    rowData?.data?.resourcePriceModelist.find(
                      (x: any) => x?.fkResourcePriceDurationId === item?.recId
                    )
                  ) {
                    let rec = rowData?.data?.resourcePriceModelist.find(
                      (x: any) => x?.fkResourcePriceDurationId === item?.recId
                    );
                    customizeArr.push({
                      recId: item.recId,
                      priceDurationName: item.name,
                      value: rec.value,
                    });
                  } else {
                    customizeArr.push({
                      recId: item.recId,
                      priceDurationName: item.name,
                      value: "",
                    });
                  }
                });
                setValue("priceDuration", customizeArr);
                setValue("name", rowData?.data?.name);
                setValue("name", rowData?.data?.name);
                setValue("area", rowData?.data?.area);
                setValue("isOpen", rowData?.data?.isOpen);
                setValue("capacity", rowData?.data?.capacity);
                setValue("description", rowData?.data?.description);
                let locationSelected: any = {
                  label: rowData?.data?.locationName,
                  value: rowData?.data?.locationId,
                };
                let floorSelected: any = {
                  label: rowData?.data?.floorName,
                  value: rowData?.data?.floorId,
                };
                let revenueAccountSelected: any = {
                  label: rowData?.data?.revenueAccountName,
                  value: rowData?.data?.revenueAccountId,
                };
                let taxRateSelected: any = {
                  label: rowData?.data?.taxRateName,
                  value: rowData?.data?.taxRateId,
                };
                setValue("floor", floorSelected ? floorSelected : null);
                setValue(
                  "roomLocation",
                  locationSelected ? locationSelected : null
                );
                setValue("taxRate", taxRateSelected ? taxRateSelected : null);
                setValue(
                  "revenueAccount",
                  revenueAccountSelected ? revenueAccountSelected : null
                );
              },
              icon: edit,
            },
            {
              label: "Delete",
              hasAction: true,
              icon: deleteIcon,
              isDisabled: deleteLoading,
              onClick: async (rowData: any) => {
                try {
                  const result = await deleteEventApi(
                    rowData?.data?.recId
                  ).unwrap();

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
                      message: "Deletion Failed",
                    });
                  }
                } catch (error: any) {
                  setDeleteAlert({
                    show: true,
                    variant: "failed",
                    message:
                      error?.data?.errors?.recId || "Something went wrong",
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
  };

  useEffect(() => {
    if (priceDurations?.data && !colState.length) {
      priceDurations?.data.map((item: any) => {
        if (!columnsData.find((ids) => ids.field == item.recId)) {
          columnsData.push({
            field: item.recId,
            headerName: item.name,
            minWidth: 220,
          });
        }
        if (!recId) {
          append({
            recId: item.recId,
            priceDurationName: item.name,
            value: "",
          });
        }
      });
      columnsData.push(action);
      setCol(columnsData);
    }
  }, [priceDurations]);

  const dataFilterFunction = async (data: any) => {
    setGlobalAppendableQuery({ keyword: data.keyword });
    setQuickFilerText({ keyword: data.keyword });
    setRefreshData((prev) => !prev);
  };

  return (
    <div>
      <PageTitle
        title="Easily manage multiple event spaces from a single dashboard."
        btnLabel="Add Event Space"
        onClick={() => {
          setDrawerAction("Add");
          setAddDrawer(true);
        }}
      />

      {/* table */}
      <DataGrid
        columnData={colState}
        fetchData={getEvents}
        key={Number(refreshData)}
        dataFilterFunction={dataFilterFunction}
        quickFilerText={quickFilerText}
      />

      {/* add / edit drawer */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          isOpen={addDrawer}
          setOpen={setAddDrawer}
          title={`${drawerAction} Event Space`}
          onClose={handleCancel}
          disableClose={addLoading || editLoading}
          footer={
            !feedback && (
              <div className="d-flex align-items-center justify-end column-gap-18">
                <PrimaryAnchor
                  type="button"
                  title="Cancel"
                  variant="secondary__btn"
                  func={handleCancel}
                  disabled={addLoading || editLoading}
                />
                <div className="drawerSubmit">
                  <PrimaryAnchor
                    type="submit"
                    title="Save Changes"
                    spinnerClass="sm"
                    isLoading={addLoading || editLoading}
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
                {fields.map((field: any, i: number) => {
                  return (
                    <Fragment key={field.id}>
                      <div className={`col_4`}>
                        <div className={`form-group`}>
                          <InputField
                            name={`priceDuration[${i}].value`}
                            control={control}
                            placeholder={"Enter duration price"}
                            label={field.priceDurationName}
                            type={"text"}
                          />
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
                {formFields2.map((item: any, i: number) => {
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

export default EventSpacesPage;
