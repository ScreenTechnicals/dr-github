"use client";

import { login } from "@/helpers";
import { Button, Card } from "@nextui-org/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoLogoGithub } from "react-icons/io5";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
      toast.success("Logged in successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to login with Github");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-dvh flex place-items-center place-content-center bg-[url(/images/bg.webp)] text-white bg-cover bg-no-repeat bg-center">
      <Toaster position="top-center" />
      <Card className="text-center shadow-none bg-transparent text-white flex items-center justify-center flex-col p-10 w-[90%] md:w-[500px]">
        <p className="text-sm md:text-lg font-light">Hi there 👋</p>
        <h1 className="m-0 mb-5 font-light">
          Welcome To <span className="text-nowrap">Dr. Github</span>
        </h1>
        <Button
          variant="solid"
          radius="sm"
          startContent={!isLoading && <IoLogoGithub size={30} />}
          className="w-fit font-semibold invert"
          onPress={handleLogin}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Login with Github
        </Button>
      </Card>
      <p className="absolute bottom-7 text-center text-sm text-white/60">
        Examines the <br /> GitHub repo using AI
      </p>
    </main>
  );
};
