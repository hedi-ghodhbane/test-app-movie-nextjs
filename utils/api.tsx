import axios from 'axios';

import {
  API_BASE_URL, API_KEY, BASE_URL,
} from '../config/tmdb';





const api = axios.create({
  baseURL: API_BASE_URL 
  
});

const MovieApi = {
    getAsc:async (page:number) => await axios.get(API_BASE_URL+"&sort_by=popularity.asc&page="+page),
    getDesc:async (page:number) => await axios.get(API_BASE_URL+"&sort_by=popularity.desc&page="+page),
    getMovieById:async (id:number) => {
      console.log(BASE_URL+id+'?api_key='+API_KEY+'&language=en-US');
      return await axios.get(BASE_URL+id+'?api_key='+API_KEY+'&language=en-US');}
}


export default MovieApi;
