import { ItemBase } from './Base';

export interface MovieItem extends ItemBase {
  runtime: number;

  //tagline: string;
  //productionCountries: any[]; // countries
  //belongs_to_collection: {}
  //imdb_id: string;
  //video: boolean;
  //budget: number;
  //revenue: number;
}

/*
spokenLangauges: any[]; // languages
languages: any[]; // languages
*/

//productionCompanies: any[]; // companies
//homepage: string;
//voteAverage: number;
//voteCount: number;
//originalLanguage: string;

/*
originalName: string;
originalTitle: string;
*/

export interface TvItem extends ItemBase {
  numberOfEpisodes: number;
  numberOfSeasons: number;

  //name = title

  //seasons: any[]; // seasons
  //type: string;
  
  
  //originCountry: string[]; // ["GB"] why array, idk
  //networks: any[]; // networks
  //nextEpisodeToAir: any; // episode
  //inProduction: boolean;
  //lastEpisodeToAir: any; // episode
  //lastAirDate: Date;
}