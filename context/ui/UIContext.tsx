import { createContext } from 'react';

interface ContextProp {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProp);
