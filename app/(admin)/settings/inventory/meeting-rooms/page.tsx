"use client";

import { Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Drawer from "@/app/components/General/Drawer";
import DataGrid from "@/app/components/Dashboard/DataGrid";
import FormGroup from "@/app/components/General/FormGroup";
import PageTitle from "@/app/components/Inventory/PageTitle";
import Feedback from "@/app/components/Feedback";
import Alert from "@/app/components/Alert";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";

import {
  negativeValueValidation,
  requiredValidation,
  mustBeAValidNumber,
} from "@/app/Utility/utility";
import {
  useAddMeetingRoomMutation,
  useAllAmenitiesQuery,
  useAllTaxeRatesQuery,
  useDeleteMeetingRoomMutation,
  useEditMeetingRoomMutation,
  useGetAllLocationsQuery,
  useGetAllResourcePriceDurationQuery,
} from "@/app/redux/reducers/MeetingRoomSlice/MeetingRoomApiSlice";
import { getApiData } from "@/app/Utility/apiFunctions";
import { DropdownType, Pagination } from "@/app/Utility/commonTypes";
import { Amenity, Location } from "@/app/Utility/types/inventory";
import { ImageWithTextComp } from "@/app/components/Dashboard/DataGrid/DataGridComponents";
import { CustomCellRendererProps } from "ag-grid-react";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";
import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";
import SelectField from "@/app/components/General/FormElements/SelectField";
import InputField from "@/app/components/General/FormElements/InputField";
import Image from "next/image";

const MeetingRooms = () => {
  const [addDrawer, setAddDrawer] = useState(false);
  const [taxRateId, setTaxRateId] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [revenues, setRevenues] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [recId, setRecId] = useState(null);
  const [colState, setCol] = useState([]);
  const [globalAppendableQuery, setGlobalAppendableQuery] = useState({});
  const [quickFilerText, setQuickFilerText] = useState({ keyword: "" });

  const [drawerAction, setDrawerAction] = useState("add");
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

  const { data: amenities, isLoading: amenitiesLoading } =
    useAllAmenitiesQuery();
  const { data: taxes, isLoading: taxesLoading } = useAllTaxeRatesQuery();
  const { data: priceDurations, isLoading: priceLoading } =
    useGetAllResourcePriceDurationQuery();
  const { data: locations, isLoading: locationLoading } =
    useGetAllLocationsQuery();
  const [addMeetingApi, { isLoading: addLoading }] =
    useAddMeetingRoomMutation();
  const [deleteMeetingApi, { isLoading: deleteLoading }] =
    useDeleteMeetingRoomMutation();
  const [editMeetingApi, { isLoading: editLoading }] =
    useEditMeetingRoomMutation();

  const init = {
    name: "",
    roomLocation: null,
    floor: null,
    capacity: null,
    // hourlyPrice: "",
    // halfDayPrice: "",
    // fullDayPrice: "",
    amenities: [],
    revenueAccount: null,
    taxRateId: null,
    uploadFile: null,
    description: "",
    visibilityLevel: "",
    // priceDuration: [{ value: "" }],
    // location: null,
    // member: null,
    // plan: null,
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
    revenueAccount: yup
      .object({
        value: yup.string().required(requiredValidation),
        label: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    taxRateId: yup
      .object({
        value: yup.string().required(requiredValidation),
        label: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    uploadFile: yup.string().required(requiredValidation),
    description: yup.string().required(requiredValidation),
    visibilityLevel: yup.string().required(requiredValidation),
    priceDuration: yup.array().required(requiredValidation),
    // priceDuration: yup.array().of(
    //   yup.object().shape({
    //     value: yup.string().required(requiredValidation).nullable(),
    //   })
    // ),
    // location: yup.object({
    //   value: yup.string().required(requiredValidation),
    // }),
    // // .required(requiredValidation),
    // member: yup.object({
    //   value: yup.string().required(requiredValidation),
    // }),
    // // .required(requiredValidation),
    // plan: yup.object({
    //   value: yup.string().required(requiredValidation),
    // }),
    // .required(requiredValidation),
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: init,
    resolver: yupResolver(schema),
  });

  const taxRateOnChange = (data: DropdownType) => {
    setTaxRateId(data.value);
  };
  const locationOnChange = (data: DropdownType) => {
    setLocationId(data.value);
  };

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
      req: true,
      multiSelect: false,
      colWidth: "col_md_4",
      onChange: locationOnChange,
      options: locations?.data?.locations
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
      req: true,
      placeholder: "Enter capacity",
      label: "Capacity",
      colWidth: "col_md_4",
      inputtype: "number",
    },
  ];
  const formFields2 = [
    {
      type: "checkboxGroup",
      name: "amenities",
      label: "Amenities",
      options: amenities?.data
        ? amenities.data?.map((item: any) => ({
            name: item.name,
            id: item.recId,
          }))
        : [],
    },
    {
      type: "select",
      name: "taxRateId",
      label: "Tax Rate",
      req: true,
      placeholder: "Select Tax Rate",
      multiSelect: false,
      colWidth: "col_md_6",
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
      req: true,
      placeholder: "Select Revenue Account",
      multiSelect: false,
      colWidth: "col_md_6",
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
      label: "Upload file",
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
      rows: 6,
      req: true,
    },
    {
      type: "radio",
      name: "visibilityLevel",
      label: "Visibility Level",
      horizontal: true,
      req: true,
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
          id: "limited",
          name: "Limited",
        },
      ],
    },
    // {
    //   type: "select",
    //   name: "location",
    //   label: "Location",
    //   placeholder: "Select Location",
    //   multiSelect: true,
    //   colWidth: "col_md_4",
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
    // {
    //   type: "select",
    //   name: "member",
    //   label: "Member",
    //   placeholder: "Select Member",
    //   multiSelect: true,
    //   colWidth: "col_md_4",
    //   options: [
    //     {
    //       name: "Member 1",
    //       id: "Member 1",
    //     },
    //     {
    //       name: "Member 2",
    //       id: "Member 2",
    //     },
    //     {
    //       name: "Member 3",
    //       id: "Member 3",
    //     },
    //   ],
    // },
    // {
    //   type: "select",
    //   name: "plan",
    //   label: "Plan",
    //   placeholder: "Select Plan",
    //   multiSelect: true,
    //   colWidth: "col_md_4",
    //   options: [
    //     {
    //       name: "Plan 1",
    //       id: "Plan 1",
    //     },
    //     {
    //       name: "Plan 2",
    //       id: "Plan 2",
    //     },
    //     {
    //       name: "Plan 3",
    //       id: "Plan 3",
    //     },
    //   ],
    // },
  ];

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

  const columnsData = [
    {
      field: "name",
      headerName: "Name",
      cellRenderer: ImageWithTextComp,
      minWidth: 290,
    },
    {
      field: "locationName",
      maxWidth: 240,
    },
    {
      field: "floorName",
      maxWidth: 240,
    },
    {
      field: "capacity",
      maxWidth: 191,
    },
  ];

  let action: any = {
    field: "action",
    filter: false,
    maxWidth: 85,
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
                setRecId(rowData?.data?.recId);
                setLocationId(rowData?.data?.locationId);
                setTaxRateId(rowData?.data?.taxRateId);
                setDrawerAction("Edit");
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
                let updatedAmenities: any = [];
                rowData?.data?.resourceAmenityPriceModelList.forEach(
                  (item: any) => {
                    updatedAmenities.push(item.fkAmenityId);
                  }
                );
                setValue("floor", floorSelected ? floorSelected : null);
                setValue(
                  "roomLocation",
                  locationSelected ? locationSelected : null
                );
                setValue("amenities", updatedAmenities);
                setValue("taxRateId", taxRateSelected ? taxRateSelected : null);
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
              onClick: async (rowData: any) => {
                try {
                  const result = await deleteMeetingApi(
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

  useEffect(() => {
    if (priceDurations?.data && !colState.length) {
      priceDurations?.data.map((item: any) => {
        if (!columnsData.find((ids) => ids.field == item.recId)) {
          columnsData.push({
            field: item.recId,
            headerName: item.name,
            maxWidth: 165,
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

  const getRooms = async (query?: Pagination) => {
    try {
      query = {
        ...query,
        ...globalAppendableQuery,
      };
      const data = {
        path: "MeetingRoom",
        endpoint: "get-all-meeting-rooms",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      let customData: any = [];
      IncomingData.data.meetingRooms.map((item: any) => {
        let data = item;
        item.resourcePriceModelist.map((x: any) => {
          data[x?.fkResourcePriceDurationId] = x?.value;
        });
        customData.push(data);
      });
      return {
        data: customData ?? [],
        totalCount:
          IncomingData?.data?.totalCount ??
          IncomingData?.data?.meetingRooms?.length ??
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

  const onSubmit = async (val: any) => {
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
      const resourceAmenityPriceModelList = val.amenities.map(
        (item: string) => {
          return {
            fkAmenityId: item,
            isActive: true,
          };
        }
      );
      const body: any = {
        // visibilityLevel: val.visibilityLevel,
        capacity: val.capacity,
        name: val.name,
        description: val.description,
        // attachment: "", // val.uploadFile,
        taxRateId: val.taxRateId.value,
        revenueAccountId: val.revenueAccount.value,
        floorId: val.floor.value,
        locationId: val.roomLocation.value,
        resourceAmenityPriceModelList,
        resourcePriceModelist,
      };

      let res;

      if (recId) {
        body.recId = recId;
        res = await editMeetingApi(body);
      } else {
        res = await addMeetingApi(body);
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

  return (
    <div>
      <PageTitle
        title="Easily manage multiple meeting rooms from a single dashboard."
        btnLabel="Add Meeting Room"
        onClick={() => {
          setDrawerAction("Add");
          setAddDrawer(true);
        }}
      />

      <DataGrid
        pagination
        columnData={colState}
        fetchData={getRooms}
        key={Number(refreshData)}
        dataFilterFunction={dataFilterFunction}
        quickFilerText={quickFilerText}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          isOpen={addDrawer}
          setOpen={setAddDrawer}
          title={`${drawerAction} Meeting Room`}
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
                />
                <div className="drawerSubmit">
                  <PrimaryAnchor
                    type="submit"
                    spinnerClass="sm"
                    title="Save Changes"
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

export default MeetingRooms;
