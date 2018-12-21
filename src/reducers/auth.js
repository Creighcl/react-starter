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
    default:
      return state;
  }
};
