
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const localStorageKey = 'jobsApplied';

export const getJobsApplied = createAsyncThunk(
  'jobsApplied/getJobsApplied',
  async (_, { getState }) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        // const response = await axios.get(`http://localhost:8000/api/jobsApplied/jobsApplies/${userEmail}`);
        const response = await axios.get(`https://workable-webapp-backend.onrender.com/api/jobsApplied/jobsApplies/${userEmail}`);
        
        // Directly use the response data
        return response.data.jobsApplied;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
);

const jobsAppliedSlice = createSlice({
  name: 'jobsApplied',
  initialState: loadState() || [],
  reducers: {
    addJobsApplied: (state, action) => {
      const job = action.payload;
      const index = state.findIndex((j) => j._id === job._id);
      if (index === -1) {
        state.push(job);
        saveState(state);
      }
    },
    clearJobsApplied: (state) => {
      state.length = 0;
      saveState(state);
    },

    logout: (state) => {
      // Clear the state on logout
      state.length = 0;
      localStorage.removeItem(localStorageKey);
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobsApplied.fulfilled, (state, action) => {
        // Update state with the fetched jobsApplied
        return action.payload;
      })

      .addCase(addToJobsApplied.fulfilled, (state, action) => {
        const job = action.payload;
        const index = state.findIndex((j) => j._id === job._id);
        if (index === -1) {
          state.push(job);
          saveState(state);
        }
      })

      .addCase(getJobsApplied.rejected, (state, action) => {
        // Handle the rejection if needed
        console.warn(action.payload);
      });
  },
});

export const { addJobsApplied, clearJobsApplied, logout } = jobsAppliedSlice.actions;
export default jobsAppliedSlice.reducer;

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

export const addToJobsApplied = createAsyncThunk(
  'jobsApplied/addToJobsApplied',
  async (item, { getState }) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      // await axios.post('http://localhost:8000/api/jobsApplied/add', {
      await axios.post('https://workable-webapp-backend.onrender.com/api/jobsApplied/add', {

        email: userEmail,
        data: item,
      });
      return item;
    } catch (error) {
      throw error;
    }
  }
);
