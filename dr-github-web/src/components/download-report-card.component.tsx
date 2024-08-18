"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import toast from "react-hot-toast";
import { HiDownload } from "react-icons/hi";
import { ReportCard } from "./report-card.component";

type DownloadReportCardProps = {
  projectName: string;
};

const DownloadReportCard = ({ projectName }: DownloadReportCardProps) => {
  const reportCardRef = useRef<any>();

  const handleDownloadImage = async () => {
    if (reportCardRef.current) {
      const canvas = await html2canvas(reportCardRef.current, {
        windowWidth: 600,
        windowHeight: 256,
        backgroundColor: "transparent",
      });
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.href = data;
      link.download = `${projectName}-report.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Report downloaded successfully");
    }
  };

  return (
    <Card className="h-full bg-gray-950 p-0 relative group">
      <CardBody className="w-full h-full flex items-center justify-center overflow-hidden">
        <ReportCard ref={reportCardRef} projectName={projectName} />
        <div className="absolute hidden lg:flex items-center justify-center inset-0 w-full h-full bg-black/50 group-hover:opacity-100 opacity-0 duration-400 transition-all">
          <Button
            radius="sm"
            className="bg-white text-gray-800 w-fit"
            startContent={<HiDownload />}
            onPress={handleDownloadImage}
          >
            Download
          </Button>
        </div>
        <Button
          radius="sm"
          className="bg-white text-gray-800 w-[90%] lg:hidden"
          startContent={<HiDownload />}
          onPress={handleDownloadImage}
        >
          Download
        </Button>
      </CardBody>
    </Card>
  );
};
export default DownloadReportCard;
