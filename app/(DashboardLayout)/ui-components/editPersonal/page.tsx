'use client';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from '@mui/material'

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import BaseCard from '../../components/shared/BaseCard';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Forms = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Edit Personal Info">
            <>
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="First Name"
                variant="outlined"
                defaultValue="Julia"
              />
              <TextField
                id="name-basic"
                label="Last Name"
                variant="outlined"
                defaultValue="Yeo"
              />
              <TextField 
                id="email-basic" 
                label="Email" 
                variant="outlined" 
                defaultValue="yeo.julia@email.com"
              />
              
            </Stack>
            <br />
            <Button>
              Submit
            </Button>
            </>
          </BaseCard>
        </Grid>
  
        {/* <Grid item xs={12} lg={12}>
          <BaseCard title="Form Design Type">
            <Stack spacing={3} direction="row">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
              />
            </Stack>
          </BaseCard>
        </Grid> */}
      </Grid>
    );
  };
  
  export default Forms;