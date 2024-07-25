'use client';

import { useState } from 'react';
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
import { 
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import BaseCard from '../components/shared/BaseCard';


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

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDOB, setNewDOB] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dobError, setDOBError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

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
                onChange={(e) => {
                  if (e.target.value === ""){
                    setFirstNameError(true)
                  }
                  else{
                    setFirstNameError(false)
                    setNewFirstName(e.target.value)
                  }
                }}
                error={firstNameError}
                helperText={firstNameError? "First name field cannot be empty":""}
              />
              <TextField
                id="name-basic"
                label="Last Name"
                variant="outlined"
                defaultValue="Yeo"
                onChange={(e) => {
                  if (e.target.value === ""){
                    setLastNameError(true)
                  }
                  else{
                    setLastNameError(false)
                    setNewLastName(e.target.value)
                  }
                }}
                error={lastNameError}
                helperText={lastNameError? "Last name field cannot be empty":""}
              />
              <TextField 
                id="email-basic" 
                label="Email" 
                variant="outlined" 
                defaultValue="yeo.julia@email.com"
                onChange={(e) => {
                  if (e.target.value === ""){
                    setEmailError(true)
                    setEmailErrorMessage("Email field cannot be empty")
                  }
                  else if (!(/\S+@\S+\.\S+/).test(e.target.value)){
                    setEmailError(true)
                    setEmailErrorMessage("Invalid email format")
                  }
                  else if (e.target.value !== "" && (/\S+@\S+\.\S+/).test(e.target.value)){
                    setEmailError(false)
                    setEmailErrorMessage("")
                    setNewEmail(e.target.value)
                  }
                  else{
                    setEmailError(false)
                    setEmailErrorMessage("")
                  }
                }}
                error={emailError}
                helperText={emailErrorMessage}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <Stack>
                  <DatePicker 
                    label="Date of Birth"
                    slotProps={{ textField: { fullWidth: true } }} 
                    defaultValue={dayjs("1987-2-9")}
                    onChange={(value) => {
                      if(value!==null){
                        setNewDOB(`${value.$D}/${value.$M + 1}/${value.$y}`);
                      }
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
            <br />
            <Button>
              Submit
            </Button>
            </>
          </BaseCard>
          <br/>
          <Button variant="contained" color="primary"  sx={{marginTop:'10px'}} href="/myaccount">
                Back
          </Button>
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