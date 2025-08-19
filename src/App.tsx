import { type ReactNode, useState } from "react";

import "./App.css";

type User = {
  username: string;
  password: string;
};

export default function App(): ReactNode {
  const [user, setUser] = useState<Readonly<User>>({
    username: "BijanProgrammer",
    password: "1234",
  });

  const handleButtonClick = (): void => {
    setUser({
      ...user,
      password: "4321",
    });
  };

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={handleButtonClick}>Change Password</button>
    </div>
  );
}

// 1. Changes to Local Variables Won't Trigger Renders
// 2. Local variables Don't Persist Between Renders
