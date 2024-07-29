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
  { date: "2024-05-20", description: "Loan Disbursement", amount: 16000 },
  { date: "2024-06-01", description: "Monthly Payment", amount: -500 },
  { date: "2024-07-01", description: "Monthly Payment", amount: -500 },
];

const Loans = () => {
  const loanAmount =
    transactions.find(
      (transaction) => transaction.description === "Loan Disbursement"
    )?.amount || 0;
  const tenure = 24; // months
  const interestRate = 5; // percent

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Summary
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6" color="grey">
              222-37495-3
            </Typography>
            <Typography variant="h6">Loan Amount</Typography>
            <Typography variant="h3" gutterBottom>
              $15000.00
            </Typography>
            <Typography variant="h6">Tenure</Typography>
            <Typography variant="h5" gutterBottom>
              {tenure} months
            </Typography>
            <Typography variant="h6">Interest Rate</Typography>
            <Typography variant="h5" gutterBottom>
              {interestRate}% per annum
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

export default Loans;
