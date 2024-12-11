import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../features/user/User";
import {  AppThunk } from "../store";
import { userApi } from "../../api/user/user-api";
import { transformUserResponseToUser } from "./utils";

const initialState :User = {
    id: '',
    name: '',
    email: '',
    AppRoles: [],
    IsAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(_, action: PayloadAction<User>) {
            return action.payload;
        },
        getUser(state) {
            return state;
        },
        clearUser() {
            return initialState;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const loginResponse = await userApi.login({ email, password });
    const user = transformUserResponseToUser(loginResponse.User);
    dispatch(setUser(user));
  } catch (error) {
    console.error('Failed to login:', error);
    // show an error message to the user
  }
};

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    const user = transformUserResponseToUser(await userApi.getUser());
    dispatch(setUser(user));
  } catch (error) {
    
  }
};

export const signup = (name: string, email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const user = transformUserResponseToUser(await userApi.createUser({ name, email, password }));
   dispatch(setUser(user));
  } catch (error) {
    console.error('Failed to signup:', error);
    // show an error message to the user
  }
};
  

export default userSlice.reducer;