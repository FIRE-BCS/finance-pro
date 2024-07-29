"use client";
import { useState } from "react";
import { Grid, Stack, TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import BaseCard from "../../components/shared/BaseCard";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  let customerData;

  if (typeof window !== "undefined") {
    const data = window.sessionStorage.getItem("data");
    customerData = data ? JSON.parse(data) : {};
  } else {
    customerData = {};
  }

  const dobDayjs = customerData.DOB ? dayjs(customerData.DOB) : null;

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
                defaultValue={customerData.firstName}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setFirstNameError(true);
                  } else {
                    setFirstNameError(false);
                    setNewFirstName(e.target.value);
                    customerData.firstName = e.target.value
                    sessionStorage.setItem("data", JSON.stringify(customerData));
                  }
                }}
                error={firstNameError}
                helperText={
                  firstNameError ? "First name field cannot be empty" : ""
                }
              />
              <TextField
                id="name-basic"
                label="Last Name"
                variant="outlined"
                defaultValue={customerData.lastName}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setLastNameError(true);
                  } else {
                    setLastNameError(false);
                    setNewLastName(e.target.value);
                    customerData.lastName = e.target.value
                    sessionStorage.setItem("data", JSON.stringify(customerData));
                  }
                }}
                error={lastNameError}
                helperText={
                  lastNameError ? "Last name field cannot be empty" : ""
                }
              />
              <TextField
                id="email-basic"
                label="Email"
                variant="outlined"
                defaultValue={customerData.email}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setEmailError(true);
                    setEmailErrorMessage("Email field cannot be empty");
                  } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                    setEmailError(true);
                    setEmailErrorMessage("Invalid email format");
                  } else if (
                    e.target.value !== "" &&
                    /\S+@\S+\.\S+/.test(e.target.value)
                  ) {
                    setEmailError(false);
                    setEmailErrorMessage("");
                    setNewEmail(e.target.value);
                    customerData.email = e.target.value
                    sessionStorage.setItem("data", JSON.stringify(customerData));
                  } else {
                    setEmailError(false);
                    setEmailErrorMessage("");
                  }
                }}
                error={emailError}
                helperText={emailErrorMessage}
              />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <Stack>
                  <DatePicker
                    label="Date of Birth"
                    slotProps={{ textField: { fullWidth: true } }}
                    defaultValue={dobDayjs}
                    onChange={(value) => {
                      if (value !== null) {
                        setNewDOB(
                          `${value.format("YYYY")}-${value.format("MM")}-${value.format("DD")}`
                        );
                        customerData.DOB = `${value.format("YYYY")}-${value.format("MM")}-${value.format("DD")}`
                        sessionStorage.setItem("data", JSON.stringify(customerData));
                      }
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Stack>
            <br />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (!firstNameError && !lastNameError && !emailError) {
                  enqueueSnackbar("Personal information successfully changed", {
                    variant: "success",
                  });
                  router.push("/account");
                } else {
                  enqueueSnackbar(
                    "Please ensure the fields are properly filled and try submitting again",
                    { variant: "error" }
                  );
                }
              }}
            >
              Submit
            </Button>
          </>
        </BaseCard>
        <br />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "10px" }}
          onClick={() => router.push("/account")}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default Forms;
