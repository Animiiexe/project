import axios from 'axios';
import { MovieResponse } from '../types/movie';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = (page = 1) => 
  api.get<MovieResponse>('/movie/popular', { params: { page } });

export const getTopRatedMovies = (page = 1) => 
  api.get<MovieResponse>('/movie/top_rated', { params: { page } });

export const getUpcomingMovies = (page = 1) => 
  api.get<MovieResponse>('/movie/upcoming', { params: { page } });

export const getMovieDetails = (movieId: number) => 
  api.get(`/movie/${movieId}`);

export const searchMovies = (query: string, page = 1) => 
  api.get<MovieResponse>('/search/movie', { params: { query, page } });