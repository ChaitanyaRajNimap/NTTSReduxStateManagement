import {configureStore} from '@reduxjs/toolkit';
import popularMoviesReducer from '../features/popularMovies/popularMoviesSlice';

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
  },
});

export default store;
