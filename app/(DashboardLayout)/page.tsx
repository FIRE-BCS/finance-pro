"use client";
import { Grid, Box, CircularProgress } from "@mui/material";
import PageContainer from "./components/container/PageContainer";
import FinChart from "./components/dashboard/FinChart";
import FinDisplay from "./components/dashboard/FinDisplay";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <PageContainer title="SC">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            lg={4}
            onClick={() => router.push("/savings")}
            sx={{ cursor: "pointer" }}
          >
            <FinDisplay title="Savings" />
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            onClick={() => router.push("/loans")}
            sx={{ cursor: "pointer" }}
          >
            <FinDisplay title="Fixed Deposits" />
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            onClick={() => router.push("/loans")}
            sx={{ cursor: "pointer" }}
          >
            <FinDisplay title="Loans" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FinChart title="Investments" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FinChart title="Trading" />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
