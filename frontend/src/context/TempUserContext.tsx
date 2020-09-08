import React, { createContext } from "react";

type ValueType = {
  username: string;
  user_id: number;
};

const defaultValue = {
  username: "",
  user_id: 0,
};

type UserContextType = {
  user: ValueType;
  setUser: (value: ValueType) => void;
};

const UserContext = createContext<UserContextType>(undefined!);

// define provider

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState(defaultValue);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
