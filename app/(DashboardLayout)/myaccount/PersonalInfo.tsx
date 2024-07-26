import React, { useEffect, useState } from 'react';
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
  Link,
} from "@mui/material";
import BaseCard from '../components/shared/BaseCard';


export default async function PersonalInfo() {

  // const firstName = window.sessionStorage.getItem('firstName');
  const data = window.sessionStorage.getItem('data');
  const customerData = data ? JSON.parse(data) : { id: 0 };
  

  return (

    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Personal Information">

          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Typography component="legend">First Name: {customerData.firstName} </Typography>
            <Typography component="legend">Last Name: {customerData.lastName} </Typography>
            <Typography component="legend">Date of Birth: {customerData.DOB} </Typography>
            <Typography component="legend">Email: {customerData.email}</Typography>
          </Box>
          <br/>
          <Button variant="contained" color="primary"  sx={{marginTop:'10px'}} href="/editPersonal">
                Edit
          </Button>
        </BaseCard>
      </Grid>
    </Grid>

  );
}
