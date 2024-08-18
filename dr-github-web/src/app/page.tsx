"use client";

import { Report } from "@/common";
import { appConst } from "@/common/conts";
import {
  DetailedReport,
  IssueTypesChart,
  SuggestionsModal,
} from "@/components";
import { useReportStore } from "@/stores";
import {
  Button,
  Card,
  CardBody,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { twJoin } from "tailwind-merge";

const DownloadReportCard = dynamic(
  () => import("../components/download-report-card.component"),
  {
    ssr: false,
  }
);
const DownloadJsonReport = dynamic(
  () => import("../components/download-json-report.component"),
  {
    ssr: false,
  }
);

export default function Home() {
  const { reportData, setReportData } = useReportStore();
  const [report, setReport] = useState<Report>();
  const {
    isOpen: isOpenSuggesstionsModal,
    onOpen: onOpenSuggesstionsModal,
    onOpenChange: onOpenChangeSuggesstionsModal,
  } = useDisclosure();

  const totalFiles = reportData?.data.length ?? 0;

  return (
    <div
      className={twJoin(
        "w-full lg:px-10 p-5 relative flex place-content-center min-h-[90dvh] pb-10",
        !reportData && "place-items-center"
      )}
    >
      <div className="w-full mx-auto text-white p-0 bg-transparent shadow-none">
        {reportData ? (
          <div>
            <div className="w-full flex-wrap flex items-center justify-between">
              <h1 className="capitalize lg:text-3xl px-1 font-light">
                Health Report - {reportData.projectName}
              </h1>
              <div className="w-full lg:w-fit hidden lg:flex items-center gap-2 justify-between">
                <Button
                  onClick={() => {
                    setReportData(undefined);
                  }}
                  radius="sm"
                  variant="flat"
                  className="w-fit"
                >
                  Start Over
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-5 justify-between lg:flex-nowrap flex-wrap mb-5">
              <Card shadow="sm" className="w-full p-3 bg-gray-950">
                <CardBody>
                  <p className="text-sm mb-2 text-gray-500">
                    Total Files Analyzed
                  </p>
                  <h2 className="text-2xl lg:text-5xl font-bold">
                    {totalFiles}
                  </h2>
                </CardBody>
              </Card>
              <Card shadow="sm" className="w-full p-3 bg-gray-950">
                <CardBody>
                  <p className="text-sm mb-2 text-gray-500">
                    Total Files Skipped
                  </p>
                  <h2 className="text-2xl lg:text-5xl font-bold">
                    {reportData.skipedFiles}
                  </h2>
                </CardBody>
              </Card>
              <Card shadow="sm" className="w-full p-3 bg-gray-950">
                <CardBody>
                  <p className="text-sm mb-2 text-gray-500">
                    Overall Code Quality
                  </p>
                  <h2 className="text-5xl font-bold">
                    {new Intl.NumberFormat("en-Us", {
                      style: "percent",
                      minimumFractionDigits: 2,
                    }).format(reportData.quality)}
                  </h2>
                </CardBody>
              </Card>
              <Card shadow="sm" className="w-full p-3 bg-gray-950">
                <CardBody>
                  <p className="text-sm mb-2 text-gray-500">
                    Total Issues Found
                  </p>
                  <h2 className="text-5xl font-bold">{reportData.issues}</h2>
                </CardBody>
              </Card>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 mb-10">
              <IssueTypesChart />
              <DownloadReportCard projectName={reportData.projectName} />
            </div>
            <DetailedReport />
            <div className="lg:hidden block">
              {reportData.data.map((report, index) => {
                return (
                  <div key={index} className="bg-gray-800 p-5 rounded-md mb-5">
                    <h2 className="text-lg font-semibold mb-2">
                      {report.filename}
                    </h2>
                    <p className="text-sm">{report.path}</p>
                    <p className="text-sm mt-2">
                      Quality: {report.quality} / 10
                    </p>
                    <p className="text-sm mt-2">Issues: {report.issues}</p>
                    <Button
                      fullWidth
                      radius="sm"
                      variant="flat"
                      className="mt-5 bg-gray-900"
                      onClick={() => {
                        onOpenSuggesstionsModal();
                        setReport(report);
                      }}
                    >
                      View Suggesstions
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-full gap-5 place-content-center place-items-center flex flex-col">
            <div className="text-center">
              <p className="text-3xl lg:text-6xl mb-1">
                Welcome to{" "}
                <span className="text-nowrap">{appConst.appName}</span>
              </p>
              <p className="text-sm lg:text-xl">
                Examine your GitHub repo using AI
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Snippet>npm i dr-github -g</Snippet>
            </div>
            <DownloadJsonReport />
          </div>
        )}
      </div>
      {reportData && (
        <div className="fixed bg-gray-900 p-5 bottom-0 z-[999] w-full lg:hidden flex items-center gap-2 lg:justify-start justify-between">
          <Button
            onClick={() => {
              setReportData(undefined);
            }}
            radius="sm"
            variant="solid"
            className="bg-white text-gray-800 w-fit"
            isIconOnly
            startContent={<GrPowerReset size={20} />}
          />
        </div>
      )}
      {/* <CreateReportModal
        isOpen={isOpenCreateReportModal}
        onOpenChange={onOpenChangeCreateReportModal}
        formData={formData}
        setFormData={setFormData}
        title="Generate Health Report"
        repoUrl={formData.repoUrl}
        openAiApiKey={openAiApiKey}
        isOpenAiApiKey={isOpenAiApiKey}
        setOpenAiApiKey={setOpenAiApiKey}
        setIsOpenAiApiKey={setIsOpenAiApiKey}
      /> */}
      {report && (
        <SuggestionsModal
          isOpen={isOpenSuggesstionsModal}
          onOpenChange={onOpenChangeSuggesstionsModal}
          data={report}
          title={report.filename ?? "Report"}
          projectName={reportData?.projectName ?? "unknown"}
        />
      )}
    </div>
  );
}
