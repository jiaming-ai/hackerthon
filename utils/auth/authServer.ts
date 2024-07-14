import { createClient } from "../supabase/server";


export async function getUser() {
  const client = createClient();
  const { data: { user } } = await client.auth.getUser();
  return user;

}

export async function signInUser(password: string, email: string) {
  const client = createClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  })

  // return user if successful
  if (data) {
    return data.user;
  }

  return null;
}
export async function signUpNewUser(password: string, email: string) {
  const client = createClient();
  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  })

  // return user if successful
  if (data) {
    return data.user;
  }

  return null;
}
