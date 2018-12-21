import { firebase } from '../firebase/firebase';
import {
  getProviderByProviderName,
  getProviderDisplayNameFromProviderName,
  getFriendlyErrorMessageByCode,
} from '../firebase/firebaseLoginProviders';

export const login = uid => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = (providerName, errorHandling, pendingCredentials) => () => {
  const auth = firebase.auth();
  const provider = getProviderByProviderName(providerName);
  return auth.signInWithPopup(provider).then(() => {
    if (pendingCredentials) {
      auth.currentUser.linkWithCredential(pendingCredentials);
    }
  }).catch((error) => {
    const loginError = {
      ...error,
      message: getFriendlyErrorMessageByCode(error.code, error.message),
    };

    if (error.code !== 'auth/account-exists-with-different-credential') {
      errorHandling(loginError);
      return;
    }

    auth.fetchProvidersForEmail(error.email).then((providers) => {
      loginError.message = `Your Dungeoneer Profile was created using ${getProviderDisplayNameFromProviderName(providers[0])}. 
      This ${getProviderDisplayNameFromProviderName(error.credential.providerId)} account has not yet been linked 
      to your Dungeoneer Profile.`;
      [loginError.priorityProvider] = providers;
      errorHandling(loginError);
    });
  });
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => () => firebase.auth().signOut();

export const loginError = error => ({
  type: 'LOGIN_ERROR',
  error,
});
