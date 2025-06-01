import { createContext, useContext, useState, ReactNode } from "react";


interface UserContextType {
  user: User | null;
  setUser: (user: User | null ) => void;
}

export interface User {
  id: string;
  username: string;
}


export  const UserContext = createContext<UserContextType>({
  user : null,
  setUser: ()=> {}  
});


