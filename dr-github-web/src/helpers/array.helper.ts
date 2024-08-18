import { Report } from "@/common";
import { FilterOption } from "@/hooks";

export const sortReports = (
  data: Report[],
  sortBy: FilterOption["sortBy"],
  direction: FilterOption["direction"]
) => {
  return data.sort((reportA: Report, reportB: Report) => {
    const reportAValue = reportA[sortBy];
    const reportBValue = reportB[sortBy];
    console.log(reportA, sortBy);

    if (typeof reportAValue === "string" && typeof reportBValue === "string") {
      return direction === "asc"
        ? reportAValue.localeCompare(reportBValue)
        : reportBValue.localeCompare(reportAValue);
    }

    return direction === "asc"
      ? Number(reportAValue) - Number(reportBValue)
      : Number(reportBValue) - Number(reportAValue);
  });
};
