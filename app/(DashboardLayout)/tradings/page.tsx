import React from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Card,
  CardContent,
} from "@mui/material";

const transactions = [
  { date: "2024-07-01", description: "Buy", units: 10, amount: 60.47 },
  { date: "2024-07-11", description: "Sell", units: 10, amount: 57.47 },
  { date: "2024-07-15", description: "Buy", units: 20, amount: 48.47 },
  { date: "2024-07-24", description: "Sell", units: 30, amount: 71.55 },
];

const Tradings = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trading Account Summary - July 2024
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6" color="grey">
              111-79121-4
            </Typography>
            <Typography variant="h6">Total Investment</Typography>
            <Typography variant="h3" gutterBottom>
              $110.87
            </Typography>
            <Typography variant="h6">Profit / Loss</Typography>
            <Typography variant="h5" color="green">
              $5.75 (5.39%)
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h5" gutterBottom>
        Transactions
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#ffffff" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Units</TableCell>
              <TableCell align="right">Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.units}</TableCell>
                <TableCell align="right">
                  {transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Tradings;
