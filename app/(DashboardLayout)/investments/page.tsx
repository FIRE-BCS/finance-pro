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
  { date: "2024-01-01", description: "Initial Investment", amount: 1150 },
  { date: "2024-06-01", description: "Dividend", amount: 37 },
];

const Investments = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Investment Account Summary - 2024
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6" color="grey">
              444-49497-8
            </Typography>
            <Typography variant="h6">Total Investment</Typography>
            <Typography variant="h3" gutterBottom>
              $1350
            </Typography>
            <Typography variant="h6">Profit / Loss</Typography>
            <Typography variant="h5" color="green" gutterBottom>
              $200 (17.4%)
            </Typography>
            <Typography variant="h6">Investment Type</Typography>
            <Typography variant="h5" gutterBottom>
              Cash Funds - Aggressive
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
              <TableCell align="right">Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
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

export default Investments;
