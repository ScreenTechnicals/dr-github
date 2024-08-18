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

type ApiKeyModalProps = Pick<ModalProps, "isOpen" | "onOpenChange"> & {};

export const ApiKeyModal = ({ isOpen, onOpenChange }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSaveApiKey = () => {
    if (apiKey === "") {
      toast.error("Please enter an API Key");
      return;
    }

    setCookie("x-openai-api-key", apiKey);
    toast.success("API Key saved successfully");
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
              <h1 className="text-center font-light">
                Please provide your open-ai api key
              </h1>
              <Input
                placeholder="Enter Open AI API Key"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                }}
              />
              <Button
                onPress={handleSaveApiKey}
                className="my-2 bg-white text-gray-800"
                radius="sm"
              >
                Save API Key
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
