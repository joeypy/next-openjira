import type { NextPage } from 'next';
import { Grid, Card, CardHeader } from '@mui/material';
import { Layout } from './../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="Pendientes" />
          </Card>
        </Grid>

        <Grid item  xs={12} sm={4}>
          <Card>
            <CardHeader title="En Progreso" />
          </Card>
        </Grid>

        <Grid item  xs={12} sm={4}>
          <Card>
            <CardHeader title="Completadas" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
