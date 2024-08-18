import { Report } from "@/common";
import { auth } from "@/configs";
import {
  Button,
  Chip,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoArrowUpRight } from "react-icons/go";
import { twJoin } from "tailwind-merge";
import { SuggestionsModal } from "./suggestions-modal.component";

type ReportTableProps = {
  data: Report[];
  projectName: string;
};

export const ReportTable = ({ data, projectName }: ReportTableProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [report, setReport] = useState<Report>();
  const [user] = useAuthState(auth);
  const username = (user as any)?.reloadUserInfo?.screenName;
  let fileIndex = 1;

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with client async pagination"
        classNames={{
          wrapper: "bg-transparent shadow-none p-1 h-[65dvh]  2xl:h-[70dvh]",
          th: "bg-gray-800 !shadow-none text-white",
        }}
      >
        <TableHeader>
          <TableColumn key="fileIndex">No.</TableColumn>
          <TableColumn key="filename">File Name</TableColumn>
          <TableColumn key="path" className="text-center">
            Path
          </TableColumn>
          <TableColumn key="quality" className="text-center">
            Quality
          </TableColumn>
          <TableColumn key="issues" className="text-center">
            Issues
          </TableColumn>
          <TableColumn key="issueTypes" className="text-center">
            Issue Types
          </TableColumn>
          <TableColumn key="suggestions" className="text-center">
            Suggestions
          </TableColumn>
        </TableHeader>
        <TableBody items={data} loadingContent={<Spinner />}>
          {(item) => {
            const isLastItem = data?.indexOf(item) === (data?.length ?? 1) - 1;

            return (
              <TableRow
                key={item?.filename}
                className={twJoin(!isLastItem && "border-b border-gray-700")}
              >
                {(columnKey) => {
                  if (columnKey === "path") {
                    const baseUrl = `https://github.com/${username}`;
                    const filePath = `${baseUrl}/${projectName}/blob/main/${item.path}`;

                    return (
                      <TableCell className="text-center">
                        <Tooltip
                          showArrow
                          placement="left"
                          content={item.path}
                          classNames={{
                            base: [
                              "before:bg-neutral-400 dark:before:bg-white",
                            ],
                            content: [
                              "py-2 px-4 shadow-xl",
                              "text-black bg-gradient-to-br from-white to-neutral-400",
                            ],
                          }}
                        >
                          <Button
                            radius="sm"
                            variant="light"
                            as={Link}
                            href={filePath}
                            target="_blank"
                            rel="noreferrer,noopener"
                            endContent={<GoArrowUpRight size={18} />}
                          >
                            Open File
                          </Button>
                        </Tooltip>
                      </TableCell>
                    );
                  }

                  if (columnKey === "quality") {
                    const quality = getKeyValue(item, columnKey);
                    return (
                      <TableCell
                        className={twJoin(
                          "text-center",
                          quality < 5 && "text-red-500",
                          quality === 0 && "text-yellow-500"
                        )}
                      >
                        {quality}/10
                      </TableCell>
                    );
                  }

                  if (columnKey === "issues") {
                    const issues = getKeyValue(item, columnKey);
                    return (
                      <TableCell
                        className={twJoin(
                          "text-center",
                          issues > 0 ? "text-red-500" : "text-green-500",
                          issues === -1 && "text-yellow-400"
                        )}
                      >
                        {issues}
                      </TableCell>
                    );
                  }

                  if (columnKey === "fileIndex") {
                    return <TableCell>{fileIndex++}.</TableCell>;
                  }

                  if (columnKey === "suggestions") {
                    return (
                      <TableCell className="text-center">
                        <Button
                          onClick={() => {
                            setReport(item);
                            onOpen();
                          }}
                          size="sm"
                          variant="flat"
                          className="w-[80%]"
                        >
                          View Suggestions
                        </Button>
                      </TableCell>
                    );
                  }

                  if (columnKey === "issueTypes") {
                    const issueTypes: Array<string> = getKeyValue(
                      item,
                      "issueTypes"
                    );

                    if (issueTypes.length === 0) {
                      return (
                        <TableCell>
                          <Chip size="sm" color="success">
                            No Issues
                          </Chip>
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell>
                          {issueTypes.map((issueType, index) => (
                            <Chip
                              key={index}
                              color={issueType.length ? "danger" : "success"}
                              size="sm"
                              className="m-1"
                            >
                              {issueType}
                            </Chip>
                          ))}
                        </TableCell>
                      );
                    }
                  }

                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {report && (
        <SuggestionsModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          data={report}
          title={projectName}
          projectName={projectName}
        />
      )}
    </>
  );
};
