import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../constants/Utils';
import {act} from 'react-test-renderer';

const initialState = {
  loading: false,
  movies: [],
  error: '',
};

export const fetchMovies = createAsyncThunk('popularMovies/fetchMovies', () => {
  return axios.get(`${BASE_URL}`).then(resp => resp.data.results);
});

const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = '';
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
      state.error = action.error.message;
    });
  },
});

export default popularMoviesSlice.reducer;
