import { Box, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import {
  getFixedDAmount,
  getLoansAmount,
  getSavingsAmount,
} from "../../../../utils/supabase/clientApi";
import { useEffect, useState } from "react";

type Props = {
  title: string;
};

const FinDisplay: React.FC<Props> = ({ title }) => {
  const [amount, setAmount] = useState(0.0);

  useEffect(() => {
    const fetchAmount = async () => {
      const data = window.sessionStorage.getItem("data");
      const customerData = data ? JSON.parse(data) : { id: 0 };

      let fetchedAmount = 0;
      if (title === "Savings") {
        fetchedAmount = await getSavingsAmount(customerData.id);
      } else if (title === "Fixed Deposits") {
        fetchedAmount = await getFixedDAmount(customerData.id);
      } else {
        fetchedAmount = await getLoansAmount(customerData.id);
      }

      setAmount(fetchedAmount);
    };

    fetchAmount();
  }, [title]);

  return (
    <DashboardCard>
      <Box height={100}>
        <Typography variant="h3" color="grey">
          {title} ($SGD)
        </Typography>
        <Typography variant="h1" color="#525355" marginTop={2}>
          {(Math.round(amount * 100) / 100).toFixed(2)}
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default FinDisplay;
