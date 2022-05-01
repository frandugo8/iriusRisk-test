import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavOptionTypes } from "../../models/nav-options.type";

const initialState: {
  navOption?: NavOptionTypes
  isMobileNavOpen: boolean
} = {
  navOption: undefined,
  isMobileNavOpen: false
}

const dataSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setNavOption: (state, action: PayloadAction<{navOption: NavOptionTypes}>) => {
      state.navOption = action.payload.navOption
    },
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen
    },
  }
})

export const { setNavOption, toggleMobileNav } = dataSlice.actions


export default dataSlice.reducer