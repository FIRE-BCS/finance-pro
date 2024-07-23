import React from "react";
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
} from "@mui/material";
import BaseCard from '../../components/shared/BaseCard';



export default function FinancialInfo() {
  // const [value, setValue] = React.useState<number | null>(2);
  const finances = [
    {
      id: "1",
      firstName: "Julia",
      lastName: "Yeo",
      riskTolerance: "High",
      financialGoal: "Housing",
    },
  ];

  const finance = finances[0];

  return (

    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Financial Preferences">
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Typography component="legend">Risk Tolerance: {finance.riskTolerance} </Typography>
            <Typography component="legend">Financial Goal: {finance.financialGoal}</Typography>
          </Box>
          <Button variant="contained" color="primary"  sx={{marginTop:'10px'}} href="/ui-components/editFinancial">
                Edit
          </Button>
        </BaseCard>
      </Grid>
    </Grid>

  );
}

// const PersonalInfo = () => {
//   return (
//     <BaseCard title="Personal Information">
//       <TableContainer
//         sx={{
//           width: {
//             xs: "274px",
//             sm: "100%",
//           },
//         }}
//       >
//         <Table
//           aria-label="simple table"
//           sx={{
//             whiteSpace: "nowrap",
//             mt: 2,
//           }}
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   Id
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   firstName
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   lastName
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography color="textSecondary" variant="h6">
//                   Date of Birth
//                 </Typography>
//               </TableCell>
//               <TableCell align="right">
//                 <Typography color="textSecondary" variant="h6">
//                   Email
//                 </Typography>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.firstName}>
//                 <TableCell>
//                   <Typography fontSize="15px" fontWeight={500}>
//                     {user.id}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center">
//                     <Box>
//                       <Typography variant="h6" fontWeight={600}>
//                         {user.firstName}
//                       </Typography>
//                       <Typography color="textSecondary" fontSize="13px">
//                         {user.lastName}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </TableCell>
//                 <TableCell>
//                   <Typography color="textSecondary" variant="h6">
//                     {user.DOB}
//                   </Typography>
//                 </TableCell>
//                 {/* <TableCell>
//                   <Chip
//                     sx={{
//                       pl: "4px",
//                       pr: "4px",
//                       backgroundColor: product.pbg,
//                       color: "#fff",
//                     }}
//                     size="small"
//                     label={product.priority}
//                   ></Chip>
//                 </TableCell> */}
//                 <TableCell align="right">
//                   <Typography variant="h6">${user.email}</Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </BaseCard>
//   );
// };

// export default PersonalInfo;
