import { appConst } from "@/common/conts";
import { auth } from "@/configs";
import { logout } from "@/helpers";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { FaGithubAlt } from "react-icons/fa";
import { RiNpmjsFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { ApiKeyModal } from "./api-key-modal.component";

export const Header = () => {
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout. Please try again!");
    }
  };
  return (
    <header className="w-full bg-gray-900/80 backdrop-blur-md z-20 md:px-10 border-b border-gray-700 p-5 sticky inset-0 flex justify-between">
      <Link href="/" className="text-3xl font-bold">
        <span>Dr.</span> GitHub
      </Link>
      <div>
        <Dropdown radius="sm" className="p-0">
          <DropdownTrigger>
            <Avatar
              size="md"
              classNames={{
                img: "bg-red-700",
              }}
              src={user?.photoURL ?? ""}
              className="cursor-pointer border-4 border-gray-600"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            className="bg-gray-800 rounded-md p-2"
          >
            <DropdownItem
              as={Link}
              href="/profile"
              className=" text-white hover:!text-white rounded-md hover:!bg-gray-900"
              startContent={<FaGithubAlt size={20} />}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              as={Link}
              href={appConst.npmLink}
              target="_blank"
              className=" text-white hover:!text-white rounded-md hover:!bg-gray-900"
              startContent={<RiNpmjsFill size={20} />}
            >
              Docs
            </DropdownItem>
            {/* <DropdownItem
              onClick={onOpen}
              className=" text-white hover:!text-white rounded-md hover:!bg-gray-900"
              startContent={<AiFillOpenAI size={20} />}
            >
              Change API Key
            </DropdownItem> */}
            <DropdownItem
              className="text-red-600 hover:!text-red-600 rounded-md hover:!bg-gray-900"
              onPress={handleLogout}
              startContent={<TbLogout2 size={20} />}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <ApiKeyModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </header>
  );
};
