// context/UserContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userData: { 
    name: string; 
    lastName: string; 
    email: string; 
    password: string; 
    location: string; 
  } | null;
  setUserData: (data: { name: string; lastName: string; email: string; password: string; location: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<{ name: string; lastName: string; email: string; password: string; location: string } | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
