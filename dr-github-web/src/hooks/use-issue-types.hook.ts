import { useReportStore } from "@/stores";
import { useMemo } from "react";

export const useIssueTypes = () => {
  const { reportData } = useReportStore();

  const dynamicData = useMemo(() => {
    if (!reportData?.data) return [];

    return reportData.data.reduce((acc, item) => {
      item.issueTypes?.forEach((issue) => {
        acc[issue] = (acc[issue] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
  }, [reportData]);

  const formattedData = useMemo(() => {
    return Object.entries(dynamicData).map(([name, issues]) => ({
      name: name,
      value: issues,
    }));
  }, [dynamicData]);

  return formattedData;
};
