import { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from '.';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = (props: any) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {
        description,
      });
      dispatch({ type: '[Entry] - Add-Entry', payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar: boolean
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: '[Entry] - Update-Entry', payload: data });

      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const deleteEntry = async (_id: string, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
      if (!data) return null;
      dispatch({ type: '[Entry] - Delete-Entry', payload: _id });

      if (showSnackbar) {
        enqueueSnackbar('Entrada Eliminada correctamente', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] - Refresh-Data', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {props.children}
    </EntriesContext.Provider>
  );
};
