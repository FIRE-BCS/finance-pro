import { createClient } from "./client";

export async function getUserData(email: string) {
  const supabase = createClient();

  let { data: Customer, error } = await supabase
    .from("Customer")
    .select("*")
    .eq("email", email);

  return Customer?.pop();
}

export async function getFixedDAmount(customerId: number) {
  const supabase = createClient();
  var amount = 0;

  let { data: fixedDeposits, error } = await supabase
    .from("Account_Fixed_Deposit")
    .select("*")
    .eq("customerId", customerId);

  fixedDeposits &&
    fixedDeposits.forEach((fixedD) => {
      amount += fixedD.depositAmount;
    });

  return amount;
};

export async function getSavingsAmount(customerId: number) {
  const supabase = createClient();
  var amount = 0;

  let { data: savings, error } = await supabase
    .from("Account_Savings")
    .select("*")
    .eq("customerId", customerId);

    savings &&
    savings.forEach((saving) => {
      amount += saving.depositAmount;
    });

  return amount;
};

export async function getLoansAmount(customerId: number) {
  const supabase = createClient();
  var amount = 0;

  let { data: loans, error } = await supabase
    .from("Account_Loan")
    .select("*")
    .eq("customerId", customerId);

  loans &&
    loans.forEach((loan) => {
      amount += loan.loanAmount;
    });

  return amount;
};

