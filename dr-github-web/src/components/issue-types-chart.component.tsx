import { useIssueTypes } from "@/hooks";
import { Card, CardBody } from "@nextui-org/react";
import { BarChart } from "./bar-chart.component";

export const IssueTypesChart = () => {
  const formattedData = useIssueTypes();

  return (
    <Card className="relative w-full lg:min-h-[320px] pt-2 bg-gray-950">
      <CardBody>
        <BarChart data={formattedData} />
      </CardBody>
    </Card>
  );
};
