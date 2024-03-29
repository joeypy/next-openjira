import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProp {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar: boolean) => void;
  deleteEntry: (_id: string, showSnackbar: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProp);
