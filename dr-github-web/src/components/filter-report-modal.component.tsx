import { FilterOption, useFilterReport, useIssueTypes } from "@/hooks";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { twJoin } from "tailwind-merge";

type FilterReportModalProps = Pick<ModalProps, "isOpen" | "onOpenChange">;

export const FilterReportModal = ({
  isOpen,
  onOpenChange,
}: FilterReportModalProps) => {
  const { filterOption, setFilterOption } = useFilterReport();
  const allIssueTypes = useIssueTypes();
  const modifiedIssueTypes = allIssueTypes.map((issue) => issue.name);

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
            <ModalHeader>Filter Report</ModalHeader>
            <ModalBody>
              <div className="max-h-[60dvh] overflow-y-auto">
                <p>Filter by Issues</p>
                <div className="pt-5 flex items-center flex-wrap gap-3">
                  {modifiedIssueTypes.map((issueType) => {
                    const isIssueTypeSelected =
                      filterOption.issueTypes.includes(issueType);

                    return (
                      <Chip
                        key={issueType}
                        as={Button}
                        onPress={() => {
                          if (!isIssueTypeSelected) {
                            setFilterOption((data: FilterOption) => {
                              return {
                                ...data,
                                issueTypes: [...data.issueTypes, issueType],
                              };
                            });
                          } else {
                            setFilterOption((data: FilterOption) => {
                              return {
                                ...data,
                                issueTypes: data.issueTypes.filter(
                                  (issue) => issue !== issueType
                                ),
                              };
                            });
                          }
                        }}
                        className={twJoin(
                          "cursor-pointer bg-gray-700 hover:bg-blue-500 transition-colors",
                          isIssueTypeSelected && "bg-blue-500"
                        )}
                        endContent={<span className="text-xl">+</span>}
                      >
                        {issueType}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
