import { type ReactNode, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getUserApi } from "@/api/user/get-user-api.ts";

import ApiError from "@/components/ApiError/ApiError.tsx";
import Avatar from "@/components/Avatar/Avatar.tsx";
import Loading from "@/components/Loading/Loading.tsx";
import SidebarItem from "@/components/Sidebar/components/SidebarItem/SidebarItem.tsx";

import type { ResponseDto } from "@/dto/response-dto.ts";

import type { SafeUser } from "@/entities/user.ts";

export default function UserBadge(): ReactNode {
  const [response, setResponse] = useState<ResponseDto<SafeUser> | null>(null);

  useEffect(() => {
    const loadUser = (): void => {
      getUserApi().then((response) => {
        setResponse(response);
      });
    };

    window.addEventListener("userupdate", loadUser);
    loadUser();

    return () => {
      window.removeEventListener("userupdate", loadUser);
    };
  }, []);

  if (response === null) {
    return <Loading />;
  }

  if ("error" in response) {
    toast.error(response.message, { toastId: "get-user-api-error" });
    return <ApiError error={response.error} message={response.message} />;
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
