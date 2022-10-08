import React, { useContext, FC, ChangeEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  capitalize,
  Card,
  CardHeader,
  Grid,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import SaveOutLinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { getFormatDistanceToNow } from '../../utils/dateFunctions';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}
const EntryPage: FC<Props> = ({ entry }: Props) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const handleFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const handleOnSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
  };

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const handleOnDelete = async () => {
    const result = await deleteEntry(entry._id, true);
    if (!result) {
      router.push('/');
    }
  };

  return (
    <Layout title={inputValue.substring(0, 10) + '...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={handleFieldChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <CardActions>
                <Button
                  startIcon={<SaveOutLinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={handleOnSave}
                  disabled={isNotValid}
                >
                  Guardar
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          background: 'red',
        }}
        onClick={handleOnDelete}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';
import { getEntryById } from '../../database/dbEntries';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { entry },
  };
};

export default EntryPage;
