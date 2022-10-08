import { FC, useContext, useMemo, DragEvent } from 'react';
import { Box, List, Paper } from '@mui/material';
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry, false);
    endDragging();
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : undefined}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: '1px 8px',
        }}
        elevation={1}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
