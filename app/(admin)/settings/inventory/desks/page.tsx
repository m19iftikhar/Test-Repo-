"use client";

import PageTitle from "@/app/components/Inventory/PageTitle";
import DataGrid from "@/app/components/Dashboard/DataGrid";
import { desks } from "@/app/data/dataGrid";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requiredValidation } from "@/app/Utility/utility";
import Drawer from "@/app/components/General/Drawer";
import PrimaryAnchor from "@/app/components/General/Buttons/PrimaryAnchor";
import FormGroup from "@/app/components/General/FormGroup";
import { Pagination } from "@/app/Utility/commonTypes";
import { getApiData } from "@/app/Utility/apiFunctions";
import { CustomCellRendererProps } from "ag-grid-react";
import ActionsDropdown from "@/app/components/General/ActionsDropdown";
import {
  DurationComp,
  ImageWithTextComp,
  StatusComp,
} from "@/app/components/Dashboard/DataGrid/DataGridComponents";
import edit from "@/public/assets/svgs/edit.svg";
import deleteIcon from "@/public/assets/svgs/delete.svg";
import {
  useAddDeskMutation,
  useDeleteDeskMutation,
  useEditDeskMutation,
  useGetSingleDeskQuery,
  useGetDeskTypesQuery,
  useGetDeskByIdQuery,
} from "@/app/redux/reducers/DeskSlice/DeskApiSlice";
import { useLocationListingQuery } from "@/app/redux/reducers/LocationsSlice/LocationsApiSlice";
import { useFloorPlanListingQuery } from "@/app/redux/reducers/FloorPlanSlice/FloorPlanApiSlice";

const DeskPage = () => {
  const [addDrawer, setAddDrawer] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isLoading, setIsLoading]: any = useState(false);
  const [recId, setRecId] = useState(null);
  const [quickFilerText, setQuickFilerText] = useState({ keyword: "" });
  const [globalAppendableQuery, setGlobalAppendableQuery] = useState({});

  const [EditDesk] = useEditDeskMutation();
  const [AddDesk] = useAddDeskMutation();

  const [DeleteDesk] = useDeleteDeskMutation();
  const init = {
    name: "",
    resourceTypeName: null,
    locationName: null,
    floorName: null,
    availableFrom: null,
    availableTo: null,
    description: "",
  };

  const {
    data: LocationData,
    error: LocationListError,
    isLoading: LocationLoading,
    refetch: refetchLocation,
  } = useLocationListingQuery({ pageNumber: 1, pageSize: -1 });

  const {
    data: FloorData,
    error: FloorListError,
    isLoading: FloorLoading,
    refetch: refetchFloor,
  } = useFloorPlanListingQuery({ pageNumber: 1, pageSize: -1 });

  const {
    data: DeskTypeData,
    error: DeskTypeError,
    isLoading: DeskTypeLoading,
    refetch: refetchDeskType,
  } = useGetDeskTypesQuery();

  const {
    data: DeskById,
    error: DeskByIdError,
    isLoading: DeskByIdLoading,
    refetch: refetchDeskById,
  } = useGetDeskByIdQuery(recId, {
    skip: !shouldFetch,
  });

  const schema: any = yup.object({
    name: yup.string().required(requiredValidation),
    resourceTypeName: yup
      .object({
        label: yup.string().required(requiredValidation),
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    locationName: yup
      .object({
        label: yup.string().required(requiredValidation),
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    floorName: yup
      .object({
        label: yup.string().required(requiredValidation),
        value: yup.string().required(requiredValidation),
      })
      .required(requiredValidation),
    availableFrom: yup.mixed().required(requiredValidation),
    availableTo: yup.mixed().required(requiredValidation),
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

  const getDesks = async (query?: any) => {
    try {
      query = {
        ...query,
        ...globalAppendableQuery,
      };
      query = {
        ...query,
        kewword: query.keyword,
      };
      const data = {
        version: "1",
        path: "Desk",
        endpoint: "get-all-desks",
        queryParams: query,
      };
      let IncomingData = await getApiData(data);
      return {
        data: IncomingData?.data?.desks ?? [],
        totalCount:
          IncomingData?.data?.totalCount ?? IncomingData?.data?.desks?.length,
      };
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const getLocationsAndFloor = async (data: any) => {
    try {
      setAddDrawer(true);
      refetchLocation(data);
      refetchFloor(data);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const dataFilterFunction = async (data: any) => {
    setGlobalAppendableQuery({ keyword: data.keyword });
    setQuickFilerText({ keyword: data.keyword });
    setRefreshData((prev) => !prev);
  };

  const formFields = [
    {
      type: "input",
      name: "name",
      placeholder: "Enter your desk name",
      label: "Name",
      inputtype: "text",
      colWidth: "col_md_6",
    },
    {
      type: "select",
      name: "resourceTypeName",
      label: "Desk Type",
      placeholder: "Select Type",
      multiSelect: false,
      colWidth: "col_md_6",
      options: DeskTypeData?.data ?? [
        {
          name: "Desk 1",
          id: "Desk 1",
        },
        {
          name: "Desk 2",
          id: "Desk 2",
        },
        {
          name: "Desk 3",
          id: "Desk 3",
        },
      ],
    },
    {
      type: "select",
      name: "locationName",
      label: "Location",
      placeholder: "Select Location",
      multiSelect: false,
      colWidth: "col_md_6",
      options: LocationData?.data?.locations ?? [
        {
          name: "Location 1",
          id: "Location 1",
        },
        {
          name: "Location 2",
          id: "Location 2",
        },
        {
          name: "Location 3",
          id: "Location 3",
        },
      ],
    },
    {
      type: "select",
      name: "floorName",
      label: "Floor",
      placeholder: "Select Floor",
      multiSelect: false,
      colWidth: "col_md_6",
      options: FloorData?.data?.floors ?? [
        {
          name: "Floor 1",
          id: "Floor 1",
        },
        {
          name: "Floor 2",
          id: "Floor 2",
        },
        {
          name: "Floor 3",
          id: "Floor 3",
        },
      ],
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
    {
      type: "textarea",
      name: "description",
      placeholder: "Write Description here",
      label: "Description",
      rows: 6,
      req: false,
    },
  ];

  const desks = {
    columnsData: [
      {
        field: "name",
        headerName: "Name",
        minWidth: 220,
        cellRenderer: ImageWithTextComp,
      },
      {
        field: "locationName",
        headerName: "Location",
      },
      {
        headerName: "Desk Type",
        field: "resourceTypeName",
      },
      {
        field: "floorName",
        headerName: "Floor",
      },
      {
        headerName: "Availability",
        field: "availableFrom",
        cellRenderer: DurationComp,
      },
      {
        field: "status",
        cellRenderer: StatusComp,
      },
      {
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
                  onClick: async (rowData: any) => {
                    setRecId(rowData?.data?.recId);
                    console.log("rowData?.data", rowData?.data);
                    // setShouldFetch(true);
                    getLocationsAndFloor({ pageNumber: 1, pageSize: -1 });
                    setAddDrawer(true);
                    const desktype = {
                      value: rowData?.data?.resourceTypeId,
                      label: rowData?.data?.resourceTypeName,
                    };
                    const location = {
                      value: rowData?.data?.locationId,
                      label: rowData?.data?.locationName,
                    };
                    const floor = {
                      value: rowData?.data?.floorId,
                      label: rowData?.data?.floorName,
                    };
                    setValue("name", rowData?.data?.name);
                    setValue("description", rowData?.data?.description);
                    setValue(
                      "availableTo",
                      rowData?.data?.availableTo
                        ? new Date(rowData?.data?.availableTo)
                        : null
                    );
                    setValue(
                      "availableFrom",
                      rowData?.data?.availableFrom
                        ? new Date(rowData?.data?.availableFrom)
                        : null
                    );
                    if (rowData?.data?.resourceTypeName) {
                      setValue("resourceTypeName", desktype);
                    } else {
                      setValue("deskType", null); // Explicitly set to null if no value
                    }
                    if (rowData?.data?.locationName) {
                      setValue("locationName", location);
                    } else {
                      setValue("locationName", null); // Explicitly set to null if no value
                    }
                    if (rowData?.data?.floorName) {
                      setValue("floorName", floor);
                    } else {
                      setValue("floorName", null); // Explicitly set to null if no value
                    }
                  },
                  icon: edit,
                },
                {
                  label: "Delete",
                  hasAction: true,
                  icon: deleteIcon,
                  onClick: (rowData: any) => {
                    DeleteDesk(rowData?.data?.recId).then((res: any) => {
                      if (res) {
                        setRefreshData((prev) => !prev);
                      }
                    });
                  },
                },
              ]}
            />
          );
        },
      },
    ],
  };

  // const onSubmit = (val: any) => {
  //   console.log("formVal", val);
  // };

  const onSubmit = async (val: any) => {
    try {
      setIsLoading(true);
      const data: any = {
        locationName: val?.locationName?.label,
        locationId: val?.locationName?.value,
        floorName: val?.floorName?.label,
        floorId: val?.floorName?.value,
        resourceTypeName: val?.resourceTypeName?.label,
        resourceTypeId: val?.resourceTypeName?.value,
        name: val?.name,
        description: val?.description,
        // availabilityDate: "",
        availableTo: val?.availableTo,
        availableFrom: val?.availableFrom,
      };

      if (recId) {
        data.recId = recId;
        const res = await EditDesk(data);
        if (res.data.success) {
          setAddDrawer(false);
          setRefreshData((prev) => !prev);
          setRecId(null);
        } else {
          console.log("submit error update");
        }
      } else {
        const res = await AddDesk(data);
        if (res.data.success) {
          setAddDrawer(false);
          setRefreshData((prev) => !prev);
        } else {
          console.log("submit error create");
        }
      }
      reset();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageTitle
        title="Easily manage multiple desks from a single dashboard."
        btnLabel="Add Desk"
        onClick={() => {
          getLocationsAndFloor({ pageNumber: 1, pageSize: -1 });
        }}
      />

      <DataGrid
        pagination={true}
        dataFilterFunction={dataFilterFunction}
        columnData={desks.columnsData}
        fetchData={getDesks}
        key={Number(refreshData)}
        quickFilerText={quickFilerText}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          isOpen={addDrawer}
          setOpen={setAddDrawer}
          title="Add Desk"
          footer={
            <div className="d-flex align-items-center justify-end column-gap-18">
              <PrimaryAnchor
                type="button"
                title="Cancel"
                variant="secondary__btn"
                func={() => {
                  setAddDrawer(false);
                  reset();
                }}
              />
              <PrimaryAnchor type="submit" title="Save Changes" />
            </div>
          }
        >
          <div className="custom-row">
            {formFields.map((item: any, i: number) => {
              return (
                <Fragment key={i}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              );
            })}
          </div>
          <div></div>
        </Drawer>
      </form>
    </div>
  );
};

export default DeskPage;
