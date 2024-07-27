"use client";
import { Box, Grid, Typography } from "@mui/material";
import PersonalInfo from "./components/PersonalInfo";
import FinancialInfo from "./components/FinancialPref";

const Account = () => {
  return (
    <Box mt={3}>
      <Typography mt="0" variant="h2">
        My Account
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={10}>
          <PersonalInfo />
        </Grid>
        <Grid item xs={12} lg={10}>
          <FinancialInfo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Account;
