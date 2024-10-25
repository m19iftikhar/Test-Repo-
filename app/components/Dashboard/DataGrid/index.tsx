"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import QuickFilterForm from "./DataGridComponents/QuickFilterForm";
import { Pagination } from "@/app/Utility/commonTypes";
import { DataServer } from "./dataServer";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  useEffect,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  RowModelType,
  RowSelectionOptions,
  createGrid,
} from "ag-grid-community";
// import "ag-grid-charts-enterprise";
import { AG_GRID_PAGE_SIZE } from "@/app/Utility/constants";
import Spinner from "../../Spinner";
import NoRecordFound from "../../NoRecordFound";
import { LicenseManager } from "ag-grid-enterprise";

export interface DataGridProps {
  columnData: any;
  rowsData?: any;
  noRowsBg?: boolean;
  addDefaultWrapper?: boolean;
  enableRowSelection?: boolean;
  selectionMode?: "singleRow" | "multiRow";
  onSelectionChanged?: any;
  disableRowSelection?: (params: any) => boolean;
  pagination?: boolean;
  quickFilterTable?: boolean;
  customClass?: string;
  dataFilterFunction?: any;
  fetchData?: (query?: Pagination) => Promise<any>;
  pageNumber?: string;
  pageSize?: string;
  key?: any;
  quickFilerText?: any;
}

LicenseManager.setLicenseKey(
  "Using_this_{AG_Grid}_Enterprise_key_{AG-069569}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Digital_Gravity_Solution_LLC}_is_granted_a_{Multiple_Applications}_Developer_License_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{15_November_2025}____[v3]_[01]_MTc2MzE2NDgwMDAwMA==7f6c7223ab4682288a6572584247da48"
);

const getServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any
) => {
  return {
    getRows: async (params) => {
      var response = await server.getData(params.request);

      // adding delay to simulate real server call
      setTimeout(() => {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
};

const DataGrid = ({
  columnData,
  rowsData,
  noRowsBg,
  dataFilterFunction,
  addDefaultWrapper = true,
  pagination,
  onSelectionChanged,
  disableRowSelection,
  enableRowSelection = false,
  selectionMode = "singleRow",
  quickFilterTable = true,
  customClass,
  fetchData,
  pageNumber = "pageNumber",
  pageSize = "pageSize",
  key,
  quickFilerText,
}: DataGridProps) => {
  const [rowData, setRowData]: any = useState(rowsData);
  const [colDefs, setColDefs] = useState(columnData);
  const [totalRecords, setTotalRecords] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<AgGridReact>(null);

  useEffect(() => {
    setRowData(rowsData ? rowsData : []);
    setTotalRecords(50);
  }, [rowsData]);

  const defaultColDef: ColDef = {
    resizable: false,
    filter: false,
    wrapText: true,
    autoHeight: true,
    suppressHeaderMenuButton: true,
    suppressHeaderContextMenu: true,
    sortable: false,
    suppressHeaderFilterButton: true,
  };

  const autoSizeStrategy: any = {
    type: "fitGridWidth",
    defaultMinWidth: 100,
  };

  const rowSelectionProps = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: selectionMode,
      checkboxes: true,
      hideDisabledCheckboxes: true,
      selectAll: "currentPage",
      isRowSelectable: disableRowSelection,
    };
  }, [selectionMode, disableRowSelection]);

  const filterGridColumns = dataFilterFunction
    ? useCallback((data: any) => {
        dataFilterFunction(data);
      }, [])
    : null;

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 180,
    };
  }, []);

  console.log("quickFilerText 123", quickFilerText);

  const onGridReady = useCallback(async (params: GridReadyEvent) => {
    let data = await fetchData({
      [pageNumber]: 1,
      [pageSize]: AG_GRID_PAGE_SIZE,
    });
    var dataProcessor = new DataServer(
      data?.data,
      fetchData,
      pageNumber,
      pageSize
    );
    var datasource = getServerSideDatasource(dataProcessor);
    params.api!.setGridOption("serverSideDatasource", datasource);
  }, []);

  return (
    <>
      {/* {quickFilterTable && <QuickFilterForm onSubmit={filterGridColumns} />} */}
      {quickFilterTable && dataFilterFunction && (
        <QuickFilterForm
          defaultValue={quickFilerText ?? ""}
          onSubmit={filterGridColumns}
        />
      )}
      <div
        className={`agGridTheme ag-theme-quartz ${
          addDefaultWrapper ? "agGridThemeWrapper" : "w-100 h-100"
        } ${noRowsBg ? "noRowsBg" : ""} ${customClass || ""}`}
      >
        {/* <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          rowHeight={70}
          headerHeight={65}
          pagination={pagination}
          paginationPageSize={5}
          paginationPageSizeSelector={[5, 10, 15]}
          gridOptions={{
            autoSizeStrategy,
            suppressContextMenu: true,
            loadingOverlayComponent: () => {
              return <Spinner className="data-grid-loader md" />;
            },
            noRowsOverlayComponent: () => {
              return <NoRecordFound customClass="data-grid-no-record" />;
            },
          }}
        /> */}
        <AgGridReact
          columnDefs={columnData}
          defaultColDef={defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
          suppressContextMenu={true}
          rowHeight={70}
          headerHeight={65}
          autoGroupColumnDef={autoGroupColumnDef}
          rowModelType={"serverSide"}
          cacheBlockSize={AG_GRID_PAGE_SIZE}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20]}
          pagination={pagination}
          paginateChildRows={true}
          suppressAggFuncInHeader={true}
          onGridReady={onGridReady}
          gridOptions={{
            autoSizeStrategy,
            suppressContextMenu: true,
            loadingOverlayComponent: () => {
              return <Spinner className="data-grid-loader md" />;
            },
            noRowsOverlayComponent: () => {
              return <NoRecordFound customClass="data-grid-no-record" />;
            },
          }}
          {...(enableRowSelection
            ? {
                rowSelection: rowSelectionProps,
                onSelectionChanged: (event) => {
                  const selectedRows = event.api.getSelectedRows();
                  onSelectionChanged?.(selectedRows);
                },
              }
            : {})}
        />
      </div>
    </>
  );
};

export default DataGrid;
