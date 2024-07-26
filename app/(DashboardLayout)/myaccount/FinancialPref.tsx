import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Rating,
  Grid,
  Button,
} from "@mui/material";
import BaseCard from '../components/shared/BaseCard';



export default function FinancialInfo() {
  const data = window.sessionStorage.getItem('data');
  const customerData = data ? JSON.parse(data) : { id: 0 };

  return (

    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Financial Preferences">
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Typography component="legend">Risk Tolerance: {customerData.riskTolerance} </Typography>
            <Typography component="legend">Financial Goal: {customerData.financialGoal}</Typography>
          </Box>
          <br/>
          <Button variant="contained" color="primary"  sx={{marginTop:'10px'}} href="/editFinancial">
                Edit
          </Button>
        </BaseCard>
      </Grid>
    </Grid>

  );
}

