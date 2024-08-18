import { Input as InputOrg, InputProps } from "@nextui-org/react";

type PromptInputProps = InputProps;

export const Input = (props: PromptInputProps) => {
  return (
    <InputOrg
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
