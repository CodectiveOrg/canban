import { type ReactNode } from "react";

import { toast } from "react-toastify";

import ApiError from "@/components/ApiError/ApiError.tsx";
import Avatar from "@/components/Avatar/Avatar.tsx";
import Loading from "@/components/Loading/Loading.tsx";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";

import { useUser } from "@/hooks/useUser.ts";

export default function UserBadge(): ReactNode {
  const { response, isLoading, isError, error } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error.message, { toastId: "get-user-api-error" });
    return <ApiError error={error.error} message={error.message} />;
  }

  return (
    <SidebarItem
      ignoreActiveState
      id="user-badge"
      title={response.result.username}
      color="gray"
      icon={
        <Avatar
          picture={response.result.picture}
          username={response.result.username}
        />
      }
      href="/settings"
    />
  );
}
