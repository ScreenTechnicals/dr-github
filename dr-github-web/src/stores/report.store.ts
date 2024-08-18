import { Report } from "@/common";
import type { Dispatch } from "react";
import { create } from "zustand";

export type ReportData = {
  data: Report[];
  datetime: Date;
  projectName: string;
  issues: number;
  quality: number;
  skipedFiles: number;
};

type ReportState = {
  reportData: ReportData | undefined;
  setReportData: Dispatch<ReportState["reportData"]>;
};

const initialState: Omit<ReportState, "setReportData"> = {
  reportData: undefined,
};

export const useReportStore = create<ReportState>()((set) => {
  return {
    ...initialState,
    setReportData: (reportData: ReportState["reportData"]) => {
      set({ reportData });
    },
  };
});
