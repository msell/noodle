import { observable } from '@legendapp/state';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  session: null,
  user: null,
  isLoading: true,
  error: null,
};

export const authState = observable(initialState);

export async function signIn(email: string, password: string) {
  try {
    authState.isLoading.set(true);
    authState.error.set(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    authState.session.set(data.session);
    authState.user.set(data.user);
  } catch (error) {
    authState.error.set(error instanceof Error ? error.message : 'An error occurred');
    throw error;
  } finally {
    authState.isLoading.set(false);
  }
}

export async function signUp(email: string, password: string, firstName: string, lastName: string) {
  try {
    authState.isLoading.set(true);
    authState.error.set(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) throw error;

    authState.session.set(data.session);
    authState.user.set(data.user);
  } catch (error) {
    authState.error.set(error instanceof Error ? error.message : 'An error occurred');
  } finally {
    authState.isLoading.set(false);
  }
}

export async function signOut() {
  try {
    authState.isLoading.set(true);
    authState.error.set(null);

    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    authState.session.set(null);
    authState.user.set(null);
  } catch (error) {
    authState.error.set(error instanceof Error ? error.message : 'An error occurred');
  } finally {
    authState.isLoading.set(false);
  }
}

export async function resetPassword(email: string) {
  try {
    authState.isLoading.set(true);
    authState.error.set(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error) {
    authState.error.set(error instanceof Error ? error.message : 'An error occurred');
  } finally {
    authState.isLoading.set(false);
  }
}

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  authState.session.set(session);
  authState.user.set(session?.user ?? null);
  authState.isLoading.set(false);
});

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  authState.session.set(session);
  authState.user.set(session?.user ?? null);
});
