import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  };
  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  };
  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: 'UI - SetIsAdd-Entry', payload: value });
  };
  const startDragging = () => {
    dispatch({ type: 'UI - Start Dragging' });
  };
  const endDragging = () => {
    dispatch({ type: 'UI - End Dragging' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
