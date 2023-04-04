import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../../constants/Utils';

const initialState = {
  loading: false,
  movies: [],
  favorites: [],
  error: '',
};

export const fetchMovies = createAsyncThunk('popularMovies/fetchMovies', () => {
  return axios.get(`${BASE_URL}`).then(resp => resp.data.results);
});

const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        movie => movie.id !== action.payload.id,
      );
    },
  },
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
export const {addFavorite, removeFavorite} = popularMoviesSlice.actions;
