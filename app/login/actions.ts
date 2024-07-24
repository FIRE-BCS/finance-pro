"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export async function login(email: string, password: string) {
  const supabase = createClient();
  const data = {
    email,
    password,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    throw error;
  }
  
  revalidatePath("/");
  revalidatePath("/layout");
  redirect("/");
}

export async function forgetPassword(email: string) {
  const supabase = createClient();
  let { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw error;
  }
  console.log(data);
}

/*

Not in use yet

*/
export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/layout");
  revalidatePath("/");
  redirect("/account");
}
