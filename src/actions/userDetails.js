import database from '../firebase/firebase';

export const setName = name => ({
  type: 'SET_NAME',
  name,
});

export const updateName = (nameData = 'unknown') => (dispatch, getState) => {
  const { uid } = getState().auth;

  return database.ref(`users/${uid}/details/name`).set(nameData.name).then(() => {
    dispatch(setName(nameData.name));
  });
};

export const fetchName = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database.ref(`users/${uid}/details/name`).once('value').then((snapshot) => {
    dispatch(setName(snapshot.val()));
  });
};


export const updateUserDetails = updates => ({
  type: 'UPDATE_USER_DETAILS',
  updates,
});

export const setUserDetails = (details = { name: 'unknown' }) => ({
  type: 'SET_USER_DETAILS',
  details,
});

export const startUpdateUserDetails = updates => (dispatch, getState) => {
  const { uid } = getState().auth;
  const udRef = `users/${uid}/details`;
  return database.ref(udRef)
    .update(updates)
    .then(() => {
      dispatch(updateUserDetails(updates));
    });
};

export const startSetUserDetails = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  const udRef = `users/${uid}/details`;
  return database.ref(udRef)
    .once('value')
    .then((snapshot) => {
      dispatch(setUserDetails(snapshot.val()));
    });
};
