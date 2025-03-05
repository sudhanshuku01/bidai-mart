import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import axios from "axios";

export interface UserTypes {
  _id: string;
  name: string;
  email: string;
  walletPoints: number;
}

interface AuthContextType {
  user: UserTypes | null;
  token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<
  | [AuthContextType, React.Dispatch<React.SetStateAction<AuthContextType>>]
  | undefined
>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextType>({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["authorization"] = auth.token;

  useEffect(() => {
    const data = localStorage.getItem("bidai-mart");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
