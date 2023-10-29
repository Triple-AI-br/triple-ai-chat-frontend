import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IContractState {
  htmlContent?: string;
  category?: string;
  representPart?: string;
  fileName?: string;
}

const initialState: IContractState = {};

const contractSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addContract(state, action: PayloadAction<IContractState>) {
      const contract = action.payload;
      state.category = contract.category;
      state.representPart = contract.representPart;
      state.htmlContent = contract.htmlContent;
      state.fileName = contract.fileName;
    },
    removeContract(state) {
      state.category = undefined;
      state.representPart = undefined;
      state.htmlContent = undefined;
    },
  },
});

export const selectContract = (state: RootState) => state.contract;
export const { addContract: actionAddContract, removeContract: actionRemoveContract } =
  contractSlice.actions;
export const contractSliceReducer = contractSlice.reducer;
