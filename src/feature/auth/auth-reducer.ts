const initState = {};

type InitialStateType = typeof initState;
export type ActionAuthType<T = any> = { type: T };

export const authReducer = (
  state: InitialStateType = initState,
  action: ActionAuthType
): InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
