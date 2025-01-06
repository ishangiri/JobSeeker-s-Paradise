import React, { createContext, useContext} from 'react'

interface AuthContextProps {
  children: React.ReactNode;
}


const AuthContext = createContext(null);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {

  return (
    <AuthContext.Provider value={null}>
    
    {children}

    </AuthContext.Provider>
  )
}

const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };