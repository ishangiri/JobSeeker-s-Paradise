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
  setUser : React.Dispatch<React.SetStateAction<{ name: string; lastName: string; email: string; location: string, avatar : string}>>;
  user : { name: string; lastName: string; email: string; location: string, avatar : string},
  authenticated : boolean,
  setAuthenticated :  React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthentication : () => void;
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

  const [user, setUser] = useState({name: '', lastName: '', email: '', location: '', avatar: ''});
  const [userData, setUserData] = useState<{ name: string; lastName: string; email: string; password: string; location: string } | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthentication = async() => {
    //get the applicant if authentication is true and set the authentication state to true
     try{
       const response = await fetchData.get('/api/applicants/getApplicant');
      const applicant = response.data.userWIthoutpass;
    setUser(applicant);
    setAuthenticated(true);
  }
  //if authentication fails set the authentication state to false
  catch(error){
    console.log(error);
    setAuthenticated(false);
  }
}


  useEffect(() => {
    checkAuthentication();
  },[authenticated])


 
  return (
    //here userData is the data that our user will provide when they sign up so that it is available to the otp component for api call.
    <UserContext.Provider value={{ userData, setUserData, setUser, user, authenticated , setAuthenticated, checkAuthentication}}>
      {children}
    </UserContext.Provider>
  );
};
