export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DiscoverMovie {
  page: number;
  results: [Movie];
  total_pages: number;
  total_results: number;
}

export interface TV {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface DiscoverTV {
  page: number;
  results: [TV];
  total_pages: number;
  total_results: number;
}

export interface nowPlayingMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: [Movie];
  total_pages: number;
  total_results: number;
}
export interface popularMovies {
  page: number;
  results: [Movie];
  total_pages: number;
  total_results: number;
}
export interface topRatedMovies {
  page: number;
  results: [Movie];
  total_pages: number;
  total_results: number;
}
export interface upcomingMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: [Movie];
  total_pages: number;
  total_results: number;
}

export interface airingTodayTV {
  page: number;
  results: [TV];
  total_pages: number;
  total_results: number;
}
export interface onTheAirTV {
  page: number;
  results: [TV];
  total_pages: number;
  total_results: number;
}
export interface popularTV {
  page: number;
  results: [TV];
  total_pages: number;
  total_results: number;
}
export interface topRatedTV {
  page: number;
  results: [TV];
  total_pages: number;
  total_results: number;
}

export interface searchMulti {
  page: number;
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      id: number;
      name: string;
      original_language: string;
      original_name: string;
      overview: string;
      poster_path: string;
      media_type: string;
      genre_ids: number[];
      popularity: number;
      first_air_date: string;
      vote_average: number;
      vote_count: number;
      origin_country: string[];
      title: string;
      original_title: string;
      release_date: string;
      video: boolean;
    }
  ];
  total_pages: number;
  total_results: number;
}

export interface searchMovie {
  page: number;
  results: [Movie];
  total_pages: number;
  total_results: number;
}
export interface searchTV {
  page: number;
  results: [TV];
  total_pages: number;
  total_results: number;
}
export interface movieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface tvDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: string;
  networks: {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
export interface trendingAll {
  page: number;
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      id: number;
      name: string;
      original_language: string;
      original_name: string;
      overview: string;
      poster_path: string;
      media_type: string;
      genre_ids: number[];
      popularity: number;
      first_air_date: string;
      vote_average: number;
      vote_count: number;
      origin_country: string[];
      title: string;
      original_title: string;
      release_date: string;
      video: boolean;
    }
  ];
  total_pages: number;
  total_results: number;
}
export interface trendingMovies {
  page: number;
  results: [...Movie, { media_type: string }];
  total_pages: number;
  total_results: number;
}
export interface trendingTV {
  page: number;
  results: [...TV, { media_type: string }];
  total_pages: number;
  total_results: number;
}
export interface movieCredits {
  id: number;
  cast: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }
  ];
  crew: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
    }
  ];
}

export interface tvEpisodeCredits {
  id: number;
  cast: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }
  ];
  crew: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
    }
  ];
  guest_stars: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
      credit_id: string;
    }
  ];
}

export interface tvSeasonsDetails {
  _id: string;
  air_date: string;
  episodes: [
    {
      air_date: string;
      episode_number: number;
      id: number;
      name: string;
      runtime: number;
      overview: string;
      production_code: string;
      season_number: number;
      still_path: string;
      vote_average: number;
      vote_count: number;
    }
  ];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface tvEpisodeDetails {
  air_date: string;
  crew: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
    }
  ];
  guest_stars: [
    {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      character: string;
    }
  ];
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  runtime: number;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface images {
  backdrops: [
    {
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }
  ];
  id: number;
  logos: [
    {
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }
  ];
  posters: [
    {
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }
  ];
}

export interface movieTranslations {
  id: number;
  translations: [
    {
      iso_3166_1: string;
      iso_639_1: string;
      name: string;
      english_name: string;
      data: {
        homepage: string;
        overview: string;
        runtime: number;
        tagline: string;
        title: string;
      };
    }
  ];
}

export interface tvTranslations {
  id: number;
  translations: [
    {
      iso_3166_1: string;
      iso_639_1: string;
      name: string;
      english_name: string;
      data: {
        homepage: string;
        overview: string;
        name: string;
        tagline: string;
      };
    }
  ];
}

export interface videos {
  id: number;
  results: [
    {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }
  ];
}

export interface ResponseType {
  isLoading: boolean;
  isError: boolean;
  isIncorrect?: boolean;
  data?:
    | DiscoverMovie
    | DiscoverTV
    | nowPlayingMovies
    | popularMovies
    | topRatedMovies
    | upcomingMovies
    | searchMovie
    | searchTV
    | airingTodayTV
    | onTheAirTV
    | popularTV
    | topRatedTV
    | movieDetails
    | tvDetails
    | trendingAll
    | trendingMovies
    | trendingTV
    | Movie
    | TV
    | movieCredits
    | tvSeasonsDetails
    | tvEpisodeDetails
    | tvEpisodeCredits
    | searchMulti
    | images
    | movieTranslations
    | tvTranslations
    | videos
    | null;
  errorResponse: any;
}
