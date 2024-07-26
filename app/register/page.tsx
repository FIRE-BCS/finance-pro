'use client';

import { useState } from 'react';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Button,
    MenuItem,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { 
  LocalizationProvider,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb'
import Image from "next/image";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import BaseCard from '../(DashboardLayout)/components/shared/BaseCard';
import { useSnackbar } from "notistack";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Forms(){

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [trading, setTrading] = useState("");
  const [loan, setLoan] = useState("");
  const [investment, setInvestment] = useState("");
  const [fd, setFD] = useState("");
  const [savings, setSavings] = useState("");
  const [income, setIncome] = useState("");
  const [userRiskTolerance, setUserRiskTolerance] = useState("");
  const [userFinancialGoal, setUserFinancialGoal] = useState("");
  const [tradingError, setTradingError] = useState(false);
  const [loanError, setLoanError] = useState(false);
  const [investmentError, setInvestmentError] = useState(false);
  const [fdError, setFDError] = useState(false);
  const [savingsError, setSavingsError] = useState(false);
  const [incomeError, setIncomeError] = useState(false);
  const [incomeErrorMessage, setIncomeErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error2Message, setError2Message] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };

  const riskTolerance = [
    {
      value: 'Low',
    },
    {
        value: 'Medium',
    },
    {
    value: 'High',
    },
  ];

  const financialGoals = [
    {
      value: 'Family',
    },
    {
        value: 'Housing',
    },
    {
        value: 'Marriage',
    },
    {
        value: 'Retirement Planning',
    },
  ];

  return (
    <div>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <Image
            src="sc_logo.svg"
            alt="logo"
            height={60}
            width={158}
            priority
          />
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={2}></Grid>
        <Grid container spacing={3} item xs={8}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Personal Information">
              <>
              <Stack spacing={3}>
                <TextField
                  required
                  id="name-basic"
                  label="First Name"
                  variant="outlined"
                  placeholder="First Name"
                  onChange={(e) => {
                    if (e.target.value === ""){
                      setFirstNameError(true)
                    }
                    else{
                      setFirstNameError(false)
                      setFirstName(e.target.value)
                    }
                  }}
                  error={firstNameError}
                  helperText={firstNameError? "First name field cannot be empty":""}
                />
                <TextField
                  required
                  id="name-basic"
                  label="Last Name"
                  variant="outlined"
                  placeholder="Last Name"
                  onChange={(e) => {
                    if (e.target.value === ""){
                      setLastNameError(true)
                    }
                    else{
                      setLastNameError(false)
                      setLastName(e.target.value)
                    }
                  }}
                  error={lastNameError}
                  helperText={lastNameError? "Last name field cannot be empty":""}
                />
                <TextField 
                  required
                  id="email-basic" 
                  label="Email" 
                  variant="outlined" 
                  placeholder="Email"
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
                      setEmail(e.target.value)
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
                      label="Date of Birth *"
                      slotProps={{ textField: { fullWidth: true } }} 
                      onChange={(value) => {
                        if(value!==null){
                          setDOB(`${value.$D}/${value.$M + 1}/${value.$y}`);
                        }
                      }}
                    />
                  </Stack>
                </LocalizationProvider>
                <TextField
                    required
                    id="pass-basic"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    onChange={(e) => {
                      if (e.target.value === ""){
                        setError(true)
                        setErrorMessage("Password cannot be empty")
                      }
                      else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(e.target.value)){
                        setError(true)
                        setErrorMessage("Password must contain at least eight characters, one uppercase letter, one lowercase letter, one number, and one special character")
                      }
                      else if (e.target.value !== "" && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(e.target.value)){
                        setError(false)
                        setErrorMessage("")
                        setPassword(e.target.value)
                      }
                      else{
                        setError(false)
                        setErrorMessage("")
                      }
                    }}
                    error={error}
                    helperText={errorMessage}
                />
                <TextField
                    required
                    id="pass-confirm"
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    onChange={(e) => {
                      if (e.target.value === ""){
                        setError2(true)
                        setError2Message("Confirm Password cannot be empty")
                      }
                      else if (e.target.value !== "" && e.target.value !== password){
                        setError2(true)
                        setError2Message("The passwords do not match")
                      }
                      else{
                        setError2(false)
                      }
                      setConfirmPassword(e.target.value)
                    }}
                    error={error2}
                    helperText={error2?  error2Message:""}
                />
              </Stack>
              </>
            </BaseCard>
            <br/>
            <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Financial Information">
                <>
                <Stack spacing={3}>
                <TextField
                    id="account-trading"
                    label="Trading Account No."
                    variant="outlined"
                    placeholder="Trading Account No."
                    onChange={(e) => {
                      if (e.target.value !== "" && !(/^111\d{6}$/).test(e.target.value)){
                        setTradingError(true)
                      }
                      else{
                        setTradingError(false)
                        setTrading(e.target.value)
                      }
                    }}
                    error={tradingError}
                    helperText={tradingError? "Trading account number must begin with '111' with 6 other digits following it":""}
                  />
                  <TextField
                    id="account-loan"
                    label="Loan Account No."
                    variant="outlined"
                    placeholder="loan Account No."
                    onChange={(e) => {
                      if (e.target.value !== "" && !(/^222\d{6}$/).test(e.target.value)){
                        setLoanError(true)
                      }
                      else{
                        setLoanError(false)
                        setLoan(e.target.value)
                      }
                    }}
                    error={loanError}
                    helperText={loanError? "Loan account number must begin with '222' with 6 other digits following it":""}
                  />
                  <TextField
                    id="account-fd"
                    label="Fixed Deposit Account No."
                    variant="outlined"
                    placeholder="Fixed Deposit Account No."
                    onChange={(e) => {
                      if (e.target.value !== "" && !(/^333\d{6}$/).test(e.target.value)){
                        setFDError(true)
                      }
                      else{
                        setFDError(false)
                        setFD(e.target.value)
                      }
                    }}
                    error={fdError}
                    helperText={fdError? "Fixed deposit account number must begin with '333' with 6 other digits following it":""}
                  />
                  <TextField
                    id="account-investment"
                    label="Investment Account No."
                    variant="outlined"
                    placeholder="Investment Account Number"
                    onChange={(e) => {
                      if (e.target.value !== "" && !(/^444\d{6}$/).test(e.target.value)){
                        setInvestmentError(true)
                      }
                      else{
                        setInvestmentError(false)
                        setInvestment(e.target.value)
                      }
                    }}
                    error={investmentError}
                    helperText={investmentError? "Investment account number must begin with '444' with 6 other digits following it":""}
                  />
                  <TextField
                    id="account-savings"
                    label="Savings Account No."
                    variant="outlined"
                    placeholder="Savings Account No."
                    onChange={(e) => {
                      if (e.target.value !== "" && !(/^555\d{6}$/).test(e.target.value)){
                        setSavingsError(true)
                      }
                      else{
                        setSavingsError(false)
                        setSavings(e.target.value)
                      }
                    }}
                    error={savingsError}
                    helperText={savingsError? "Savings account number must begin with '555' with 6 other digits following it":""}
                  />
                  <TextField
                    required
                    id="income-yearly"
                    label="Yearly Income"
                    variant="outlined"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    placeholder="Yearly Income"
                    onChange={(e) => {
                      if (e.target.value === ""){
                        setIncomeError(true)
                        setIncomeErrorMessage("Yearly income field cannot be empty")
                      }
                      else if (e.target.value !== "" && !(/^\d+$/).test(e.target.value)){
                        setIncomeError(true)
                        setIncomeErrorMessage("Yearly income field must only consist of numerical digits")
                      }
                      else{
                        setIncomeError(false)
                        setIncome(e.target.value)
                      }
                    }}
                    error={incomeError}
                    helperText={incomeError? incomeErrorMessage:""}
                  />
                  <TextField
                    required
                    id="risk-tolerance"
                    select
                    label="Risk Tolerance"
                    variant="outlined"
                    onChange={(e) => setUserRiskTolerance(e.target.value)}
                    >
                        {riskTolerance.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                  </TextField>
                  <TextField
                    required
                    id="financial goal"
                    select
                    label="Financial Goal"
                    variant="outlined"
                    onChange={(e) => setUserFinancialGoal(e.target.value)}
                  >
                    {financialGoals.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                </>
              </BaseCard>
            </Grid>
          </Grid>
          <br/>
          <Grid>
            <Button 
              variant="contained" 
              color="primary"  
              sx={{marginTop:'10px'}}
              onClick={(e)=>{
                e.preventDefault()
                if (!firstNameError 
                    && firstName !== ""
                    && !lastNameError
                    && lastName !== ""
                    && !emailError
                    && email !== ""
                    && dob !== ""
                    && !error
                    && password !== ""
                    && !error2
                    && confirmPassword !== ""
                    && !tradingError
                    && !loanError
                    && !fdError
                    && !investmentError
                    && !savingsError
                    && !incomeError
                    && income !== ""
                    && userRiskTolerance !== ""
                    && userFinancialGoal !== ""
                  ){
                  enqueueSnackbar("Sucessfully Registered!", { variant: "success" });
                  router.push("/login")
                }
                else{
                  enqueueSnackbar("Please ensure all fields are properly filled and try submitting again", { variant: "error" });
                }
              }}>
              Submit
            </Button>
            <Button sx={{marginTop:'10px'}} href='/login'>
              Back
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </div>
  );
};