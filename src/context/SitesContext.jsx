import { createContext, useContext, useState } from 'react';
import { MOCK_SITES } from '../data/mock';

const SitesContext = createContext(null);

export function SitesProvider({ children }) {
  const [sites, setSites] = useState(MOCK_SITES);

  function addSite(site) {
    setSites((prev) => [...prev, site]);
  }

  return (
    <SitesContext.Provider value={{ sites, addSite }}>
      {children}
    </SitesContext.Provider>
  );
}

export function useSites() {
  const ctx = useContext(SitesContext);
  if (!ctx) throw new Error('useSites precisa estar dentro de <SitesProvider>');
  return ctx;
}
