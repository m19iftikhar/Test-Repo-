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
import "ag-grid-charts-enterprise";
import { AG_GRID_PAGE_SIZE } from "@/app/Utility/constants";
import Spinner from "../../Spinner";
import NoRecordFound from "../../NoRecordFound";

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
