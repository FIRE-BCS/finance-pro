import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import BaseCard from "../../components/shared/BaseCard";
import { useRouter } from "next/navigation";

export default async function PersonalInfo() {
  const router = useRouter();
  let customerData;

  if (typeof window !== "undefined") {
    const data = window.sessionStorage.getItem("data");
    customerData = data ? JSON.parse(data) : {};
  } else {
    customerData = {};
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Personal Information">
          <Box>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">
                First Name: {customerData.firstName}{" "}
              </Typography>
              <Typography component="legend">
                Last Name: {customerData.lastName}{" "}
              </Typography>
              <Typography component="legend">
                Date of Birth: {customerData.DOB}{" "}
              </Typography>
              <Typography component="legend">
                Email: {customerData.email}
              </Typography>
            </Box>
            <br />
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
}
