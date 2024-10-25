"use client";

import PageTitle from "@/app/components/Inventory/PageTitle";
import FloorPlanList from "@/app/components/Inventory/FloorPlans/FloorPlanList";
import { floorPlans } from "@/app/data/floorPlan";
import Drawer from "@/app/components/General/Drawer";

import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  requiredValidation,
  negativeValueValidation,
  mustBeAValidNumber,
} from "@/app/Utility/utility";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";
import FormGroup from "@/app/components/General/FormGroup";
import Feedback from "@/app/components/Feedback";
import Alert from "@/app/components/Alert";
import {
  useAddFloorPlansMutation,
  useEditFloorPlansMutation,
  useFloorPlanListingQuery,
  useRemoveFloorPlanMutation,
} from "@/app/redux/reducers/FloorPlanSlice/FloorPlanApiSlice";
import { useLocationListingQuery } from "@/app/redux/reducers/LocationsSlice/LocationsApiSlice";

const FloorPage = () => {
  const [addDrawer, setAddDrawer] = useState(false);
  const [pageNumber, setPageNumber] = useState(-1);
  const [pageSize, setPageSize] = useState(-1);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading]: any = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [drawerAction, setDrawerAction] = useState("Add");
  const [alertProps, setAlertProps] = useState({
    message: "",
    variant: "",
  });

  const {
    data: FloorPlans,
    error,
    isLoading: FloorPlansLoading,
    refetch: refetchFloorPlans,
  } = useFloorPlanListingQuery();

  useEffect(() => {
    if (FloorPlansLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [FloorPlansLoading]);

  const [AddFloorPlans] = useAddFloorPlansMutation();
  const [EditFloorPlans] = useEditFloorPlansMutation();

  const init = {
    name: "",
    location: null,
    floor: "",
    area: "",
    uploadFile: "",
    isOpen: false,
  };

  const schema: any = yup.object({
    name: yup
      .string()
      .max(50, "Maximum 50 characters are allowed")
      .required(requiredValidation),
    // location: yup
    //   .object({
    //     value: yup.string().required(requiredValidation),
    //   })
    //   .required(requiredValidation),
    location: yup
      .object({
        value: yup.string().required(requiredValidation), // locationId
        label: yup.string().required(requiredValidation), // locationName
      })
      .required(requiredValidation),
    floor: yup
      .number()
      .typeError(mustBeAValidNumber)
      .max(9999999, "Floor cannot exceed 7 digits")
      .min(1, negativeValueValidation)
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required(requiredValidation),
    area: yup
      .number()
      .typeError(mustBeAValidNumber)
      .max(9999999, "Area cannot exceed 7 digits")
      .min(1, negativeValueValidation)
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required(requiredValidation),
    uploadFile: yup.string().required(requiredValidation),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: init,
    resolver: yupResolver(schema),
  });

  const {
    data: Locations,
    error: locationError,
    isLoading: locationLoading,
    refetch: refetchLocations,
  } = useLocationListingQuery({ pageNumber: pageNumber, pageSize: pageSize });

  const formFields = [
    {
      type: "input",
      name: "name",
      placeholder: "Enter Floor Name",
      label: "Name",
      inputtype: "text",
      colWidth: "col_md_6",
    },
    {
      type: "select",
      name: "location",
      label: "Select Location",
      placeholder: "Select Location",
      multiSelect: false,
      colWidth: "col_md_6",
      options: Locations?.data?.locations ? Locations?.data?.locations : [],
    },

    {
      type: "input",
      name: "floor",
      placeholder: "Enter Floor Number",
      label: "Floor",
      inputtype: "number",
      colWidth: "col_md_6",
    },
    {
      type: "input",
      name: "area",
      placeholder: "Enter area in Sq.ft",
      label: "Area",
      inputtype: "number",
      colWidth: "col_md_6",
    },
    // {
    //   type: "file",
    //   name: "uploadFile",
    //   multiple: false,
    //   accept: {
    //     "image/jpeg": [],
    //     "image/png": [],
    //   },
    //   bottomLabel:
    //     "The file size limit is 10MB. Please upload an image with exactly 600px by 600px.",
    //   uploadLabel: "Drop your file to upload here",
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
      type: "checkboxSingle",
      name: "isOpen",
      label: "is Open",
    },
  ];

  const OpenDrawer = (edit?: boolean) => {
    edit ? setDrawerAction("Edit") : setDrawerAction("Add");
    refetchLocations();
    setAddDrawer(true);
  };

  const onSubmit = async (val: any) => {
    try {
      setIsLoading(true);
      const data: any = {
        area: val?.area,
        floor: val?.area,
        isOpen: val?.isOpen,
        name: val?.name,
        locationName: val?.location.label,
        locationId: val?.location.value,
        attachment: val?.uploadFile || "",
      };

      let res: any;
      if (val?.recId) {
        data.recId = val?.recId;
        res = await EditFloorPlans(data).unwrap();
      } else {
        res = await AddFloorPlans(data).unwrap();
      }

      if (res?.success) {
        if (res?.statusCode === 200) {
          reset();
          setFeedback(res?.message);
          setTimeout(() => {
            setFeedback(null);
            setAddDrawer(false);
          }, 3000);
        } else {
          setShowAlert(true);
          setAlertProps({
            variant: "failed",
            message: res?.message || "Something went wrong",
          });
        }
      } else {
        setShowAlert(true);
        setAlertProps({
          variant: "failed",
          message: "Please check all required fields",
        });
      }
      refetchFloorPlans();
    } catch (error: any) {
      setShowAlert(true);
      setAlertProps({
        variant: "failed",
        message: error?.data?.title,
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

  const handleClose = () => {
    setFeedback(null);
    setAddDrawer(false);

    if (showAlert) {
      closeAlert();
    }

    reset();
  };
  return (
    <div>
      <PageTitle
        title="Easily manage multiple floors from a single dashboard."
        btnLabel="Add Floor Plan"
        onClick={() => {
          OpenDrawer(false);
        }}
      />

      <FloorPlanList
        data={FloorPlans?.data}
        setValue={setValue}
        openDrawer={() => OpenDrawer(true)}
        key={Number(refreshData)}
        refetch={refetchFloorPlans}
        isLoading={isLoading}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          isOpen={addDrawer}
          setOpen={setAddDrawer}
          title={`${drawerAction} Floor Plan`}
          disableClose={isLoading}
          onClose={handleClose}
          footer={
            !feedback && (
              <div className="d-flex align-items-center justify-end column-gap-18">
                <PrimaryAnchor
                  type="button"
                  title="Cancel"
                  disabled={isLoading}
                  variant="secondary__btn"
                  func={handleClose}
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
    </div>
  );
};

export default FloorPage;
