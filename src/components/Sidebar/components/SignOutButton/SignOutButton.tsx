import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { signOutApi } from "@/api/auth/sign-out-api.ts";

import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";

import MingcuteExitLine from "@/icons/MingcuteExitLine.tsx";

export default function SignOutButton(): ReactNode {
  const navigate = useNavigate();

  const handleSignOutButtonClick = async (): Promise<void> => {
    const data = await signOutApi();

    if ("error" in data) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    navigate("/sign-in");
  };

  return (
    <SidebarItem
      id="sign-out"
      title="Sign Out"
      color="gray"
      icon={<MingcuteExitLine />}
      onClick={handleSignOutButtonClick}
    />
  );
}
