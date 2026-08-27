import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { randomApi } from "@/api/auth/random-api.ts";

import Button from "@/components/Button/Button.tsx";
import RandomCredentials from "@/components/RandomCredentials/RandomCredentials.tsx";

export default function RandomButton(): ReactNode {
  const navigate = useNavigate();

  const handleRandomButtonClick = async (): Promise<void> => {
    const data = await randomApi();

    if ("error" in data) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    navigate("/");

    toast(
      <RandomCredentials
        username={data.result.username}
        password={data.result.password}
      />,
      { autoClose: false },
    );
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleRandomButtonClick}
    >
      Use a Random Account
    </Button>
  );
}
