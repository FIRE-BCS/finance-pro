"use client";
import { Grid, Box, CircularProgress } from "@mui/material";
import PageContainer from "./components/container/PageContainer";
import FinChart from "./components/dashboard/FinChart";
import FinDisplay from "./components/dashboard/FinDisplay";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <FinDisplay title="Savings" />
          </Grid>
          <Grid item xs={12} lg={4}>
            <FinDisplay title="Fixed Deposits" />
          </Grid>
          <Grid item xs={12} lg={4}>
            <FinDisplay title="Loans" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FinChart title="Investments"/>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FinChart title="Trading"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
