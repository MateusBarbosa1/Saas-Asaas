import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../lib/api';

const SitesContext = createContext(null);

export function SitesProvider({ children, isAuthenticated }) {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setSites([]);
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch('/sites');
      setSites(res.data);
    } catch {
      setSites([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function addSite(payload) {
    const res = await apiFetch('/sites', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setSites((prev) => [...prev, res.data]);
    return res.data;
  }

  return (
    <SitesContext.Provider value={{ sites, loading, addSite, refresh }}>
      {children}
    </SitesContext.Provider>
  );
}

export function useSites() {
  const ctx = useContext(SitesContext);
  if (!ctx) throw new Error('useSites precisa estar dentro de <SitesProvider>');
  return ctx;
}
