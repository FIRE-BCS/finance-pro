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
  { date: "2023-10-20", description: "Deposit", amount: 200000 },
];

const FixedDeposits = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fixed Deposit Summary
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6" color="grey">
              333-18492-0
            </Typography>
            <Typography variant="h6">Fixed Deposit Amount</Typography>
            <Typography variant="h3" gutterBottom>
              $200000.00
            </Typography>
            <Typography variant="h6">Duration</Typography>
            <Typography variant="h5" gutterBottom>
              12 months
            </Typography>
            <Typography variant="h6">Interest Rate</Typography>
            <Typography variant="h5" gutterBottom>
              3.5% per annum
            </Typography>
            <Typography variant="h6">Expected Amount at Maturity</Typography>
            <Typography variant="h5" gutterBottom>
              $207000.00
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

export default FixedDeposits;
