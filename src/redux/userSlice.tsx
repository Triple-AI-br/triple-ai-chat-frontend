import { createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

interface IUser {
    session: Session | null;
}

const initialState: IUser = { session: null };

const userSlice = createSlice({ name: "user", initialState, reducers: {} });

export const userSliceReducer = userSlice.reducer;
