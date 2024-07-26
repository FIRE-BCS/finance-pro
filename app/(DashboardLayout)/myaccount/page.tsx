"use client";
import { Box, Grid, Typography } from "@mui/material";
import PersonalInfo from "./PersonalInfo";
import FinancialInfo from "./FinancialPref";

const Tables = () => {
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
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={10}>
          <FinancialInfo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tables;
