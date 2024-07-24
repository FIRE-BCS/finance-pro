import { Box, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";

type Props = {
  title: string;
  amount: number;
};

const FinDisplay = ({ title, amount }: Props) => {
  return (
    <DashboardCard>
      <Box height={100}>
        <Typography variant="h3" color="grey">
          {title}
        </Typography>
        <Typography variant="h1" color="#525355" marginTop={2}>
          ${amount} SGD
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default FinDisplay;
