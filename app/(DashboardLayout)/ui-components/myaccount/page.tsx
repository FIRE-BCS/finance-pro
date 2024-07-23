'use client';
// import {
//     Paper,
//     Grid,
//     Stack,
//     TextField,
//     Button,
// } from '@mui/material'
// import {
//     LocalizationProvider,
//     DatePicker,
// } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import 'dayjs/locale/en-gb';
import BaseCard from '../../components/shared/BaseCard';
import PersonalInfo from './PersonalInfo';
import { Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body1,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     height: 60,
//     lineHeight: '60px',
//   }));
// 
// const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


const MyAccount = () => {
return (
  <Grid container spacing={0}>
    <Grid item xs={12} lg={12}>
      <PersonalInfo />
    </Grid>
  </Grid>
);
};

export default MyAccount;

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