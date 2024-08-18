import { Report } from "@/common";
import { useReportStore } from "@/stores";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalProps,
} from "@nextui-org/react";
import { setCookie } from "cookies-next";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "./input.component";
import { Textarea } from "./textarea.component";

type ReportData = {
  data: Report[];
  datetime: Date;
  projectName: string;
};

export type FormDataType = {
  repoUrl: string;
  ignoreContent: string;
  conventions: string;
};

type CreateReportModalProps = Pick<ModalProps, "isOpen" | "onOpenChange"> & {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  title: string;
  repoUrl: string;
  openAiApiKey: string;
  isOpenAiApiKey: boolean;
  setOpenAiApiKey: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAiApiKey: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateReportModal = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  openAiApiKey,
  isOpenAiApiKey,
  setOpenAiApiKey,
  setIsOpenAiApiKey,
}: CreateReportModalProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("Generate Report");
  const { setReportData } = useReportStore();

  const handleSaveApiKey = () => {
    if (openAiApiKey === "") {
      toast.error("Please enter an API Key");
      return;
    }

    setCookie("x-openai-api-key", openAiApiKey);
    setIsOpenAiApiKey(true);
    toast.success("API Key saved successfully");
  };

  const handleGenerateReport = async () => {
    setSubmitting(true);

    try {
      const sanitizedRepoUrl = formData.repoUrl.trim();
      const sanitizedIgnoreContent = formData.ignoreContent.trim();
      const sanitizedConventions = formData.conventions?.trim() || "";

      if (!sanitizedRepoUrl || !sanitizedIgnoreContent) {
        toast.error("All fields are required");
        setSubmitting(false);
        return;
      }

      const requestData = JSON.parse(
        JSON.stringify({
          repoUrl: sanitizedRepoUrl,
          restrictedPaths: sanitizedIgnoreContent,
          conventions: sanitizedConventions,
        })
      );

      const myHeaders = new Headers();
      myHeaders.append("x-openai-api-key", openAiApiKey);
      myHeaders.append("x-openai-model", "gpt-4o-mini");
      myHeaders.append("Content-Type", "application/json");

      const reponse = await fetch(`/dr-github/api/get-report`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestData),
      });

      const result = await reponse.json();

      const projectName = formData.repoUrl
        .trim()
        .replace(/\/$/, "")
        .split("/")
        .pop();

      // setReportData({
      //   data: result,
      //   datetime: new Date(),
      //   projectName: projectName ?? "",
      // });

      toast.success("Report generated successfully", {
        id: "generate-report",
      });

      setMessage("Generate Report");
      setSubmitting(false);
    } catch (err) {
      toast.error("Failed to generate report");
      setSubmitting(false);
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="md"
      size="2xl"
      classNames={{
        body: "py-6",
        base: "w-[900px] border-[#292f46] !bg-gray-800 text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:!bg-transparent text-2xl py-4 px-3 hidden",
        wrapper: "z-[999]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {isOpenAiApiKey ? (
                <>
                  <h1 className="text-center font-light">
                    Provide all the necessary details
                  </h1>
                  <Input
                    placeholder="Enter Repo Url"
                    value={formData.repoUrl}
                    onChange={(e) => {
                      setFormData((restData) => {
                        return {
                          ...restData,
                          repoUrl: e.target.value,
                        };
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Enter Dr Ignore Contents"
                    value={formData.ignoreContent}
                    onChange={(e) => {
                      setFormData((restData) => {
                        return {
                          ...restData,
                          ignoreContent: e.target.value,
                        };
                      });
                    }}
                  />
                  <Textarea
                    placeholder="Enter Dr Conventions (Optional)"
                    value={formData.conventions}
                    onChange={(e) => {
                      setFormData((restData) => {
                        return {
                          ...restData,
                          conventions: e.target.value,
                        };
                      });
                    }}
                  />
                  <Button
                    isDisabled={submitting}
                    isLoading={submitting}
                    onPress={handleGenerateReport}
                    className="bg-white text-gray-800 my-2"
                    radius="sm"
                  >
                    {message}
                  </Button>
                </>
              ) : (
                <>
                  <h1 className="text-center font-light">
                    Please provide your open-ai api key
                  </h1>
                  <Input
                    placeholder="Enter Open AI API Key"
                    value={openAiApiKey}
                    onChange={(e) => {
                      setOpenAiApiKey(e.target.value);
                    }}
                  />

                  <Button
                    onPress={handleSaveApiKey}
                    className="my-2 bg-white text-gray-800"
                    radius="sm"
                  >
                    Save API Key
                  </Button>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
