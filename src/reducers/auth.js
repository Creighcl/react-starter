const defaultState = {
  uid: '',
  errorMessage: '',
  priorityProvider: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
      };
    case 'LOGOUT':
      return {};
    case 'LOGIN_ERROR':
      return {
        error: action.error,
      };
    default:
      return state;
  }
};
