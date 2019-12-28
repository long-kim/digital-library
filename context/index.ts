export interface AppState {
  user: firebase.User | null;
}

export const context: AppState = {
  user: null,
};
