import { useDebounce, useFilterReport } from "@/hooks";
import { useReportStore } from "@/stores";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "./input.component";
import { ReportTable } from "./report-table.component";

export const DetailedReport = () => {
  const { searchQuery, setSearchQuery, modifiedReport } = useFilterReport();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { reportData } = useReportStore();
  // const {
  //   isOpen: isFilterModalOpen,
  //   onOpen: onFilterModalOpen,
  //   onOpenChange: onFilterModalOpenChange,
  // } = useDisclosure();

  return (
    <>
      <Card className="p-5 bg-gray-900 md:flex hidden">
        <CardBody>
          <div className="w-full justify-between mb-5 gap-5 flex items-center flex-wrap">
            <h1 className="m-0">Detailed Report</h1>
            <div className="flex items-center gap-5 md:w-fit w-full">
              <Input
                type="search"
                placeholder="Search with file name or path"
                classNames={{
                  inputWrapper:
                    "hover:!bg-gray-800 !bg-gray-800 md:w-[500px] w-full",
                }}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              {/* <Button
                size="lg"
                className="bg-gray-800"
                isIconOnly
                startContent={<IoFilter />}
                onPress={onFilterModalOpen}
              /> */}
            </div>
          </div>
          <div className="lg:block hidden">
            <ReportTable
              key={debouncedSearchQuery}
              data={modifiedReport}
              projectName={reportData?.projectName ?? "unknown"}
            />
          </div>
        </CardBody>
      </Card>
      {/* <FilterReportModal
        isOpen={isFilterModalOpen}
        onOpenChange={onFilterModalOpenChange}
      /> */}
    </>
  );
};
