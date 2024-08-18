"use client";

import { Header, Loading, Login } from "@/components";
import { auth } from "@/configs";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";

type GeneralLayoutProps = {
  children: ReactNode;
};

export const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) return <Loading />;
  if (!user) return <Login />;

  return (
    <NextUIProvider navigate={router.push}>
      <div className="min-h-dvh bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <Toaster position="top-center" />
        <Header />
        <div>{children}</div>
      </div>
    </NextUIProvider>
  );
};
