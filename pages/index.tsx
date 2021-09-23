import type {NextPage} from "next";
import Layout from "../components/layout/Layout";
import React, {useEffect, useState, useCallback} from "react";
import MovieService, {GetType} from "../services/movies_service";
import {PageableResponse} from "./../models/pageable_response";
import {Movie} from "../models/movie";
import {IMAGE_BASE_URL} from "../config/tmdb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faStar} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import Link from "next/link";

const placholderImage =
  "https://www.shobgulo.com/wp-content/uploads/woocommerce-placeholder-450x450.png";
const Home: NextPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sort, setSort] = useState<GetType>(GetType.desc);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightedMovies,setHighlightedMovies]=useState<number[]>([]);
  const highlightMovie=(id:number)=>{
     if(highlightedMovies.indexOf(id)==-1){
       localStorage.setItem(id.toString(),"highlight");
       setHighlightedMovies([...highlightedMovies,id]);
     }else {

       localStorage.removeItem(id.toString());
       setHighlightedMovies(highlightedMovies.filter((_)=>_!==id));
     }
  }
  const getMovies = async () => {
    const movieService = new MovieService();
    setLoading(true);
    const result: PageableResponse<Movie[]> = await movieService.getAll(
      page,
      sort
    );
    // this is just for you to see the loading .. it might not be visible because of the internet conneciton speed so i wanted to let you see it
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setTotalPages(result.total_pages);
    setTotalResults(result.total_results);
    setMovies(result.results);
  };
  useEffect(() => {
    getMovies();
    setHighlighted(); 
  }, [sort, page]);
  const setHighlighted = async ()=>{
let highlighted = [];
    for(let item in localStorage){
      console.log(item);  
      if(await localStorage.getItem(item) === 'highlight'){
        highlighted.push(+item);
      }
    }
    console.log(highlighted);
    setHighlightedMovies(highlighted);
  }
  return (
    <Layout title="Movie App">
      {loading && (
        <div className="loading">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className="header">
        <h4 style={{}}>Top Movies ({totalResults})</h4>
        <div
          onClick={() =>
            setSort(sort == GetType.asc ? GetType.desc : GetType.asc)
          }
          className="sort"
        >
          <h4>{sort == GetType.asc ? "desending" : "ascending"}</h4>
          {sort == GetType.desc ? (
            <FontAwesomeIcon icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} />
          )}
        </div>
      </div>
      <div className="movies-container">
        {movies.map((movie) => (
          <div className={"poster"+  (highlightedMovies.indexOf(movie.id) !== -1 ? " highlighted":"")} key={movie.id}>
            <a href={"/" + movie.id}>
              <img
                src={
                  movie.poster_path
                    ? IMAGE_BASE_URL + movie.poster_path
                    : placholderImage
                }
                alt="poster"
              />
            </a>
            {movie.original_title}
            <div className="rating">{movie.vote_average}</div>
            <FontAwesomeIcon onClick={()=>highlightMovie(movie.id)}  icon={faStar} className="star"/>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          onPageChange={(page: {selected: number}) => {
            console.log(page);
            setPage(page.selected + 1);
          }}
          pageCount={totalPages}
        />
      </div>
    </Layout>
  );
};

export default Home;
