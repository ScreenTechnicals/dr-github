import { useReportStore } from "@/stores";
import { ComponentProps, forwardRef } from "react";
import { RxTriangleRight } from "react-icons/rx";

type ReportCardProps = Pick<ComponentProps<"div">, "ref"> & {
  projectName: string;
};

export const ReportCard = forwardRef<HTMLDivElement, ReportCardProps>(
  ({ projectName }, ref) => {
    const { reportData } = useReportStore();
    const totalFiles = reportData?.data.length;
    const issues = reportData?.issues;
    const quality = reportData?.quality;

    return (
      <div
        className="p-3 bg-gray-800 w-fit flex items-center justify-center"
        ref={ref}
      >
        <div className="shadow-md rounded-md relative bg-gradient-to-b p-0 overflow-hidden from-gray-900 to-gray-950 text-white w-full lg:w-[512px] min-h-[256px] select-none">
          <div className="font-mono font-extrabold">
            <div className="absolute -top-3 right-10 w-10 h-10 rounded-full bg-gray-800" />
            <div className="p-5">
              <h2 className="text-xl">Dr. Github</h2>
              <p className="font-light text-base mb-5">
                Examines a given repo and gives suggestions to the issues for
                each file.
              </p>
              <div className="p-5 bg-gray-800 w-full lowercase rounded-md">
                <p className="flex items-center text-base">
                  <RxTriangleRight />
                  <span>
                    dr-github examine{" "}
                    <span className="text-nowrap">{`'${projectName}'`}</span>
                  </span>
                </p>
                <p className="flex items-center text-base">
                  <RxTriangleRight />
                  <span>files checked : {totalFiles}</span>
                </p>
                <p className="flex items-center text-base">
                  <RxTriangleRight />
                  <span>
                    code quality :{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "percent",
                      minimumFractionDigits: 2,
                    }).format(Number(quality))}
                  </span>
                </p>
                <p className="flex items-center text-base">
                  <RxTriangleRight />
                  <span>issues : {issues}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ReportCard.displayName = "ReportCard";
