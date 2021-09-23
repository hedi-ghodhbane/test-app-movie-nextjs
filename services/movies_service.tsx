import { Movie } from "../models/movie";
import { PageableResponse } from "../models/pageable_response";
import MovieApi from "../utils/api";

export enum GetType {
    asc='asc',
    desc='desc'
}
export default class MovieService {
     async getAll(page:number,type:GetType):Promise<PageableResponse<Movie[]>>{
     if(type == GetType.asc){
         return await (await MovieApi.getAsc(page)).data;
     } else {

         return await (await MovieApi.getDesc(page)).data;
     }
    }
    async getMovieById(id:number):Promise<Movie>{
        console.log(id,"getmovie id")
        return await (await MovieApi.getMovieById(id)).data;
    }
}