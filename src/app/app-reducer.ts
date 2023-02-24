const initState = {};
type InitialStateType = typeof initState;

type ActionsAppType<T = any> = { type: T };

export const appReducer = (
  state: InitialStateType = initState,
  action: ActionsAppType
): InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
