import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../sercives/user/users-reducer";

const store = configureStore({
    reducer: {
        users: usersReducer
    }
})

export default store;