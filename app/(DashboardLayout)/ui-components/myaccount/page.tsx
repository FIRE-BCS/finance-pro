'use client';
import { Box, Grid, Paper } from "@mui/material";
import BaseCard from '../../components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


import PersonalInfo from "./PersonalInfo";
import FinancialInfo from "./FinancialInfo";

const Tables = () => {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={10}>
          <PersonalInfo/>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={10}>
          <FinancialInfo />
        </Grid>
      </Grid>
  </Box>
  );
};


export default Tables;

// export default function MyAccount(){
//     return (
//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={12}>
//           <BaseCard title="My Account">
//             <>
//             <Stack spacing={3}>
//               <TextField
//                 id="name-full"
//                 label="Full Name"
//                 variant="outlined"
//                 defaultValue="Get from supabase"
//               />
//               <TextField
//                 id="name-user"
//                 label="Username"
//                 variant="outlined"
//                 defaultValue="Get from supabase"
//               />
//               <TextField
//                 id="email-basic"
//                 label="Email"
//                 variant="outlined"
//                 defaultValue="Get from supabase"
//               />
//               <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
//                 <DemoContainer components={['DatePicker']}>
//                     <DatePicker 
//                         label="Date of Birth"
//                         slotProps={{ textField: { fullWidth: true } }}
//                         // value={get from supabase}
//                     />
//                 </DemoContainer>
//               </LocalizationProvider>
//               <TextField
//                 id="address"
//                 label="Address"
//                 variant="outlined"
//                 defaultValue="Get from supabase"
//               />
//             </Stack>
//             <br />
//             <Button>
//               Submit
//             </Button>
//             </>
//           </BaseCard>
//         </Grid>
//       </Grid>
//     );
//   };