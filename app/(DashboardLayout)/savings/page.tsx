"use client";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const transactions = [
  { date: "2024-07-1", description: "Deposit", amount: 500 },
  { date: "2024-07-3", description: "Deposit", amount: 20 },
  { date: "2024-07-5", description: "Withdrawal", amount: -124.85 },
  { date: "2024-07-7", description: "Deposit", amount: 100 },
  { date: "2024-07-15", description: "Withdrawal", amount: -23.45 },
  { date: "2024-07-20", description: "Deposit", amount: 20 },
  { date: "2024-07-22", description: "Deposit", amount: 50 },
  { date: "2024-07-25", description: "Withdrawal", amount: -210.05 },
  { date: "2024-07-13", description: "Interest", amount: 5 },
];

const Savings = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Savings Account Summary - July 2024
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6" color="grey">
              555-16381-2
            </Typography>
            <Typography variant="h6">Total Balance</Typography>
            <Typography variant="h3">$9983.13</Typography>
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

export default Savings;
