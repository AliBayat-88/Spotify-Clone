import supabase from './supabase.js'

export async function signUpApi({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logOutApi() {
  await supabase.auth.signOut();
}

export async function signOutEverywhereApi() {
  const { error } = await supabase.auth.signOut({ scope: 'global' });
  if (error) throw new Error(error.message);
}

export async function deleteAccountApi() {
  const { error } = await supabase.rpc('delete_user_account');
  if (error) throw new Error(error.message);

  await supabase.auth.signOut();
}


export async function forgotPasswordApi({ email }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login/reset-password`,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updatePasswordApi({ password }) {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) throw new Error(error.message);

  return data;
}

export async function resendVerificationEmailApi(email) {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
  return data;
}


export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function loginWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`,
      queryParams: {
        prompt: 'select_account',
      },
    },

  });
}

export async function signInWithOtp(email) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) throw error;

  return data;
}

export async function verifyOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) throw error;

  return data;
}