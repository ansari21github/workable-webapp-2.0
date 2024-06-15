
import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './slices/bookmarkSlice';
import jobsAppliedReducer from './slices/jobsAppliedSlice';

const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    jobsApplied: jobsAppliedReducer,
  },
});

export default store;