import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock validation
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }

    const userData = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (storedUsers.some((u: any) => u.email === email)) {
      setIsLoading(false);
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
    };

    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
