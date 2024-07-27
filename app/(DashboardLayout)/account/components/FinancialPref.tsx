import React from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import BaseCard from "../../components/shared/BaseCard";
import { useRouter } from "next/navigation";

export default function FinancialInfo() {
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
        <BaseCard title="Financial Preferences">
          <Box>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">
                Risk Tolerance: {customerData.riskTolerance}{" "}
              </Typography>
              <Typography component="legend">
                Financial Goal: {customerData.financialGoal}
              </Typography>
            </Box>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "10px" }}
              onClick={() => router.push("/account/editFinancial")}
            >
              Edit
            </Button>
          </Box>
        </BaseCard>
      </Grid>
    </Grid>
  );
}
