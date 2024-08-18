import { Textarea as TextAreaOrg, TextAreaProps } from "@nextui-org/react";

type PromptInputProps = TextAreaProps;

export const Textarea = (props: PromptInputProps) => {
  return (
    <TextAreaOrg
      variant="flat"
      radius="sm"
      size="lg"
      classNames={{
        inputWrapper: "hover:!bg-black !bg-black pr-1",
        input: "bg-transparent !text-white",
      }}
      {...props}
    />
  );
};
