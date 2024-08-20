"use client";

import { Report } from "@/common";
import { useReportStore } from "@/stores";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidFileJson } from "react-icons/bi";
import { FaArrowRight, FaFileUpload } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import { Input } from "./input.component";

const DownloadJsonReport = () => {
  const [jsonReportData, setJsonReportData] = useState<Report[]>();
  const [projectName, setProjectName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<any>();
  const reportCardRef = useRef<any>();
  const { setReportData } = useReportStore();

  const openFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOpenFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setJsonReportData(JSON.parse(result));
        }
      };
      reader.readAsText(file);
    }
  };

  const handleViewDetails = () => {
    if (!projectName) {
      toast.error("Please enter a project name");

      return;
    }

    const issues = jsonReportData?.reduce(
      (acc, curr) => (curr.issues === -1 ? acc + 0 : acc + curr.issues),
      0
    );
    const skipedFiles = jsonReportData?.filter(
      (item) => item.issues === -1
    ).length;
    const quality =
      (jsonReportData ?? [])?.reduce((acc, curr) => acc + curr.quality, 0) /
      ((jsonReportData ?? [])?.length * 10);

    setReportData({
      data: jsonReportData ?? [],
      datetime: new Date(),
      projectName,
      issues: issues ?? 0,
      quality: quality ?? 0,
      skipedFiles: skipedFiles ?? 0,
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <input
        type="file"
        ref={inputRef}
        hidden
        accept=".json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleOpenFile(file);
          }
        }}
      />
      {jsonReportData ? (
        <Card className="flex p-5 bg-gray-800 w-full md:w-[600px] items-center justify-center flex-col overflow-hidden">
          <CardBody>
            <h1 className="m-0 mb-5 text-center md:text-3xl text-2xl">
              Please Enter Project Name
            </h1>
            <Input
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              className="mb-2"
              endContent={
                <Button
                  onPress={handleViewDetails}
                  className="bg-white text-gray-800"
                  isIconOnly
                  startContent={<FaArrowRight />}
                />
              }
              required
            />
          </CardBody>
        </Card>
      ) : (
        <Card
          as={Button}
          className={twJoin(
            "bg-gray-800 w-full md:w-[512px] h-[300px] cursor-pointer p-0",
            isDragOver && "animate-pulse"
          )}
        >
          <CardBody className="flex items-center justify-center">
            <div
              className="absolute inset-0 w-full h-full"
              onClick={() => {
                openFile();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  handleOpenFile(file);
                }
              }}
            />
            {isDragOver ? (
              <FaFileUpload size={60} />
            ) : (
              <BiSolidFileJson size={60} />
            )}
            <h1 className="text-base md:text-xl">
              Click Here or Drag and drop {"'ai-report.json'"}
            </h1>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default DownloadJsonReport;
