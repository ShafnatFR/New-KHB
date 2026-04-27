// ============================================================
// src/context/CMSContext.tsx
// Global context untuk data publik dari CMS
// (settings, navigation) — difetch sekali saat app load
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { fetchSettings, fetchNavigation } from '../services/cms';
import type { SiteSettings, NavItem } from '../types/cms';

interface CMSContextValue {
  settings: SiteSettings | null;
  navItems: NavItem[];
  loadingCMS: boolean;
  errorCMS: string | null;
}

const CMSContext = createContext<CMSContextValue>({
  settings: null,
  navItems: [],
  loadingCMS: true,
  errorCMS: null,
});

export function CMSProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [navItems, setNavItems]   = useState<NavItem[]>([]);
  const [loadingCMS, setLoading]  = useState(true);
  const [errorCMS, setError]      = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [sett, nav] = await Promise.all([
          fetchSettings(),
          fetchNavigation(),
        ]);
        if (cancelled) return;
        setSettings(sett);
        setNavItems(nav);
      } catch (err) {
        if (!cancelled) {
          console.warn('[CMSContext] Gagal fetch settings/nav:', err);
          setError('Tidak dapat terhubung ke CMS.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <CMSContext.Provider value={{ settings, navItems, loadingCMS, errorCMS }}>
      {children}
    </CMSContext.Provider>
  );
}

/** Hook untuk mengakses CMS context */
export function useCMS() {
  return useContext(CMSContext);
}
