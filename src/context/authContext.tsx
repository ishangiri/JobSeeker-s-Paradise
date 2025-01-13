// context/UserContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import fetchData from '@/utils/fetchData';

interface UserContextType {
  userData: { 
    name: string; 
    lastName: string; 
    email: string; 
    password: string; 
    location: string; 
  } | null;
  setUserData: (data: { name: string; lastName: string; email: string; password: string; location: string }) => void;
  name : string,
  authenticated : boolean,
  setAuthenticated :  React.Dispatch<React.SetStateAction<boolean>>
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

  const [name, setName] = useState("");
  const [userData, setUserData] = useState<{ name: string; lastName: string; email: string; password: string; location: string } | null>(null);
  const [authenticated, setAuthenticated] = useState(false);



  useEffect(() => {

    const checkAuthentication = async() => {
      //get the applicant if authentication is true and set the authentication state to true
       try{
         const response = await fetchData.get('/api/applicants/getApplicant');
        const applicant = response.data.userWIthoutpass.name;
      setName(applicant);
      setAuthenticated(true);
    }
    //if authentication fails set the authentication state to false
    catch(error){
      console.log(error);
      setAuthenticated(false);
    }
  }
    checkAuthentication();


  },[authenticated])


 
  return (
    <UserContext.Provider value={{ userData, setUserData, name, authenticated , setAuthenticated}}>
      {children}
    </UserContext.Provider>
  );
};
