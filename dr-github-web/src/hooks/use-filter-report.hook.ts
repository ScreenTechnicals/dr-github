import { Report } from "@/common";
import { useReportStore } from "@/stores";
import { useMemo, useState } from "react";
import { useDebounce } from "./use-debounce.hook";
import { useIssueTypes } from "./use-issue-types.hook";

export type FilterOption = {
  issueTypes: string[];
  direction: "asc" | "desc";
  sortBy: keyof Pick<Report, "filename" | "issues" | "path" | "quality">;
};

export const useFilterReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { reportData } = useReportStore();
  const allIssueTypes = useIssueTypes();
  const allIssueTypesSet = new Set(allIssueTypes.map((issue) => issue.name));

  const [filterOption, setFilterOption] = useState<FilterOption>({
    issueTypes: [],
    direction: "asc",
    sortBy: "quality",
  });

  const { issueTypes, direction, sortBy } = filterOption;

  const modifiedReport = useMemo<Report[]>(() => {
    if (!reportData) return [];

    const filteredReports = reportData.data.filter((report) => {
      return (
        report.filename
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        report.path.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    });

    return filteredReports;

    // const filterByIssueTypes = filteredReports?.filter((report) => {
    //   if (issueTypes.length === 0) return true;
    //   return report.issueTypes.some((issueType) =>
    //     issueTypes.includes(issueType)
    //   );
    // });

    // return sortReports(filterByIssueTypes!, sortBy, direction);
  }, [debouncedSearchQuery, reportData]);

  return {
    modifiedReport,
    allIssueTypesSet,
    searchQuery,
    setSearchQuery,
    setFilterOption,
    filterOption,
  };
};
