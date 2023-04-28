import * as userServices from './user-services'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
    "users/login",
    async (user, thunkAPI) => await userServices.login(user)
);

export const logoutThunk = createAsyncThunk(
    "users/logout",
    async (user, thunkAPI) => await userServices.logout()
);

export const registerThunk = createAsyncThunk(
    "users/register",
    async (user, thunkAPI) => await userServices.register(user)
);

export const profileThunk = createAsyncThunk(
    "users/profile",
    async (user, thunkAPI) => {
        return await userServices.profile();
    }
);

export const findUserByUsernameThunk = createAsyncThunk(
    "users/findUserByUsername",
    async (username) => await userServices.findUserByUsername(username)
);

export const updateUserThunk = createAsyncThunk(
    "users/update",
    async (user, thunkAPI) => await userServices.updateUser(user)
);