
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const localStorageKey = 'bookmarks';

export const getBookmarks = createAsyncThunk(
  'bookmarks/getBookmarks',
  async (_, { getState  }) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        // const response = await axios.get(`http://localhost:8000/api/bookmark/bookmarks/${userEmail}`);
        const response = await axios.get(`https://workable-webapp-backend.onrender.com/api/bookmark/bookmarks/${userEmail}`);

        // Extract the "item" property from each bookmarkObject
        const transformedBookmarks = response.data.bookmarks.map(bookmarkObject => bookmarkObject.item);

        return transformedBookmarks;
      } else {
        
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: loadState() || [],
  reducers: {
   
    addBookmark: (state, action) => {
      const job = action.payload;
      const index = state.findIndex((j) => j._id === job._id);

      if (index === -1) {
        state.push(job);
        saveState(state);
      }
    },
    removeBookmark: (state, action) => {
      const job = action.payload;
      const index = state.findIndex((j) => j._id === job._id);

      if (index !== -1) {
        state.splice(index, 1);
        saveState(state);
      }
     
    },
    clearBookmarks: (state) => {
      // Clear bookmarks in the Redux store
      state.length = 0;
      // Clear bookmarks in localStorage
      saveState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmarks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        // Handle the rejection if needed
      });
  },
});

export const {   addBookmark, removeBookmark ,  clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;

function loadState() {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}


function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch (error) {
    // Ignore write errors
  }
}



export const removeFromBookmarked = createAsyncThunk(
  'bookmarks/removeFromBookmarked',
  async ({ item }, { getState }) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      // await axios.delete('http://localhost:8000/api/bookmark/remove', {
      await axios.delete('https://workable-webapp-backend.onrender.com/api/bookmark/remove', {
        data: { email: userEmail, data: item },
      });
      return item;
    } catch (error) {
      throw error;
    }
  }
);

export const addToBookmarks = createAsyncThunk(
  'bookmarks/addToBookmarks',
  async (item, { getState }) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      // await axios.post('http://localhost:8000/api/bookmark/add', {
      await axios.post('https://workable-webapp-backend.onrender.com/api/bookmark/add', {
        email: userEmail,
        data: item,
      });
      return item;
    } catch (error) {
      throw error;
    }
  }
);







