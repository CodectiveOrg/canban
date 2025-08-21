import { type ReactNode, useState } from "react";

import "./App.css";

type User = {
  id: number;
  username: string;
  role: "user" | "admin";
};

export default function App(): ReactNode {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: "BijanProgrammer",
      role: "admin",
    },
    {
      id: 2,
      username: "Reza",
      role: "user",
    },
    {
      id: 3,
      username: "Ali",
      role: "admin",
    },
  ]);

  const handleAddButtonClick = (): void => {
    setUsers((old) => {
      const clone = [...old];

      clone.splice(1, 0, {
        id: clone.length + 1,
        username: "New",
        role: "user",
      });

      return clone;
    });
  };

  return (
    <div className="app">
      <button onClick={handleAddButtonClick}>Add User</button>

      {users.map((user) => (
        <Item key={user.id} user={user} />
      ))}

      {users.length % 2 === 0 ? (
        <Hello key="even" label="even" />
      ) : (
        <Hello key="odd" label="odd" />
      )}

      {users.length % 2 === 0 && <Hello label="even" />}
      {users.length % 2 === 1 && <Hello label="odd" />}
    </div>
  );
}

type HelloProps = {
  label: string;
};

function Hello({ label }: HelloProps): ReactNode {
  const [name, setName] = useState<string>("");

  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <div>Hello, {name}!</div>
    </div>
  );
}

type ItemProps = {
  user: User;
};

function Item({ user }: ItemProps): ReactNode {
  console.log(user.username);

  return (
    <li>
      ({user.role}) {user.username}
      <input type="text" />
    </li>
  );
}
