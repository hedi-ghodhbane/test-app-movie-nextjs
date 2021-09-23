import React from "react";
import Layout from "./../components/layout/Layout";
import {useRouter} from "next/router";
import {useEffect} from "react";
import MovieService from "../services/movies_service";
import {useState} from "react";
import {Movie} from "../models/movie";
import {IMAGE_BASE_URL} from "../config/tmdb";
//@ts-ignore
import ReactStars from "react-rating-stars-component";
import Image from 'next/image'

import styles from "../styles/Movie.module.css";
const placholderImage =
  "https://www.shobgulo.com/wp-content/uploads/woocommerce-placeholder-450x450.png";

function MovieDetails() {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const getMovie = async (id: number) => {
    console.log(id);
    const movieService = new MovieService();
    setLoading(true);
    const movie = await movieService.getMovieById(id);
    setLoading(false);
    console.log(movie);
    setMovie(movie);
  };
  useEffect(() => {
    if (+router.asPath.split("/")[1]) getMovie(+router.asPath.split("/")[1]);
  }, [router.asPath]);
  return (
    <Layout>
      {loading && (
        <div className="loading">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      { !loading && movie && <div className={styles.movie}>
        <img
          src={
            movie?.poster_path
              ? IMAGE_BASE_URL + movie?.poster_path
              : placholderImage
          }
          alt=""
        />
        <div className={styles.details}>
          <h1>{movie?.original_title}</h1>
          <h3
            style={{
              color: "#C1C1C1",
            }}
          >
            {movie?.tagline}
          </h3>
          <h2
            style={{
              color: "red",
            }}
          >
            Overview
          </h2>
          <h5>{movie?.overview}</h5>
          <h3 style={{
              color:"#c1c1c1"
          }}>{movie?.release_date}</h3>
          <ReactStars
            count={5}
            size={30}
            edit={false}
            value={(movie?.vote_average ?? 0) * 0.5}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          {movie?.vote_average}  from ({movie?.vote_count})  reviews
          <div className={styles.links}>
            <a
            
rel="noreferrer"
            href={movie?.homepage} target="_blank">
              Home Page
            </a>
            <a
              href={"https://www.imdb.com/title/" + movie?.imdb_id}
              target="_blank"

rel="noreferrer"
            >
              IMDb
            </a>
          </div>
        </div>
      </div>}
    </Layout>
  );
}

export default MovieDetails;
