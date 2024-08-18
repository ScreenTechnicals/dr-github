import { Report } from "@/common";
import { auth } from "@/configs";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoArrowUpRight } from "react-icons/go";
import { twJoin } from "tailwind-merge";

type SuggestionsModalProps = Pick<ModalProps, "isOpen" | "onOpenChange"> & {
  data: Report;
  title: string;
  projectName: string;
};

export const SuggestionsModal = ({
  isOpen,
  onOpenChange,
  data,
  title,
  projectName,
}: SuggestionsModalProps) => {
  const [user] = useAuthState(auth);
  const username = (user as any)?.reloadUserInfo?.screenName;
  const paras = data.suggestions.split("\n").filter((para) => para !== "");

  const baseUrl = `https://github.com/${username}`;
  const filePath = `${baseUrl}/${projectName}/blob/main/${data.path}`;

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="md"
      size="2xl"
      classNames={{
        body: "py-6",
        base: "w-[900px] border-[#292f46] bg-gray-900 text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:!bg-transparent text-2xl py-4 px-3",
        wrapper: "z-[999]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 capitalize">
              {title}
            </ModalHeader>
            <ModalBody>
              <div className="max-h-[60dvh] overflow-y-auto">
                {paras.map((para, index) => (
                  <p key={index} className="mb-4">
                    <pre className="text-wrap font-sans">
                      {para.replaceAll("**", "")}
                    </pre>
                  </p>
                ))}
              </div>
            </ModalBody>
            <ModalFooter className="justify-between">
              <div>
                <p
                  className={twJoin(
                    "font-light text-sm",
                    data.issues > 0 ? "text-red-500" : "text-green-500"
                  )}
                >
                  Issues: {data.issues}
                </p>
                <p className="font-light text-white text-sm">
                  Quality: {data.quality}/10
                </p>
              </div>
              <Button
                as={Link}
                href={filePath}
                target="_blank"
                variant="solid"
                radius="sm"
                className="bg-[#6f4ef2]/60"
                onPress={onClose}
                endContent={<GoArrowUpRight size={24} />}
              >
                Open On Github
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
