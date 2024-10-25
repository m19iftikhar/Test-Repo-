import { AG_GRID_PAGE_SIZE } from "@/app/Utility/constants";

export function DataServer(
  allData: any,
  dataReqFunc: any,
  pageNumber: any,
  pageSize: any
) {
  return {
    getData: async function (request: any) {
      var results = await executeQuery(request);
      console.log("FAKESERVER HIT", request);
      return {
        success: true,
        rows: results.data,
        lastRow: getLastRowIndex(request, results.totalCount),
      };
    },
  };

  async function executeQuery(request: any) {
    let newPage = Math.ceil(request?.endRow / AG_GRID_PAGE_SIZE);
    let newData: any = await dataReqFunc({
      [pageNumber]: newPage,
      [pageSize]: AG_GRID_PAGE_SIZE,
    });
    console.log("🚀 ~ executeQuery ~ newData:", newData);
    return {
      data: newData?.data ?? [],
      totalCount: newData?.totalCount ?? newData?.data?.length,
    };
  }

  function getLastRowIndex(request: any, totalCount: any) {
    // Return the total row count based on the passed data length
    const totalRows = totalCount; // Use the length of the allData instead of hardcoded value
    return totalRows;
  }
}
