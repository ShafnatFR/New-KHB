// ============================================================
// src/context/AuthContext.tsx
// Autentikasi – login, register, logout, restore session
// Token disimpan di localStorage (gantikan dengan httpOnly
// cookie bila backend mendukungnya di masa mendatang)
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { login as apiLogin, register as apiRegister, fetchProfile } from '../services/cms';
import type { AuthUser, LoginPayload, RegisterPayload } from '../types/cms';

const TOKEN_KEY = 'khb_auth_token';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loadingAuth: boolean;
  authError: string | null;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  isAuthenticated: false,
  loadingAuth: false,
  authError: null,
  login: async () => { },
  register: async () => { },
  logout: () => { },
  clearError: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingAuth, setLoading] = useState(true);
  const [authError, setError] = useState<string | null>(null);

  // Restore session dari localStorage saat app load
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) { setLoading(false); return; }

    fetchProfile(storedToken)
      .then(profile => {
        setUser(profile);
        setToken(storedToken);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const _persist = (token: string, user: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    // Pertahankan flag komunitas lama agar Navbar tidak berkedip
    localStorage.setItem('isJoinedCommunity', 'true');
    window.dispatchEvent(new Event('communityStatusChanged'));
    setToken(token);
    setUser(user);
  };

  const login = useCallback(async (data: LoginPayload) => {
    setError(null);
    setLoading(true);
    try {
      const resp = await apiLogin(data);
      _persist(resp.token, resp.user);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login gagal.';
      setError(msg.includes('401') ? 'Email atau password salah.' : msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterPayload) => {
    setError(null);
    setLoading(true);
    try {
      const resp = await apiRegister(data);
      _persist(resp.token, resp.user);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registrasi gagal.';
      setError(msg.includes('400') ? 'Email sudah terdaftar.' : msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('isJoinedCommunity');
    window.dispatchEvent(new Event('communityStatusChanged'));
    setUser(null);
    setToken(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loadingAuth,
        authError,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Hook untuk mengakses Auth context */
export function useAuth() {
  return useContext(AuthContext);
}
