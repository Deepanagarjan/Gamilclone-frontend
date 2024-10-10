import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    open: true, // Controls visibility of the compose modal
    user: null,  // Stores authenticated user info
    emails: [],  // Stores list of fetched emails
    selectedEmail: null, // Currently selected email for viewing
    searchText: "", // Text for searching/filtering emails
  },
  reducers: {
    // Action to toggle the compose modal's visibility
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    // Action to store authenticated user's data
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    // Action to store the list of fetched emails
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    // Action to set the currently selected email for viewing
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    // Action to set the search query for filtering emails
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

// Exporting the actions to be used in components
export const { setOpen, setAuthUser, setEmails, setSelectedEmail, setSearchText } = appSlice.actions;

// Exporting the reducer to be used in the Redux store
export default appSlice.reducer;
