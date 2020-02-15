import HelperBase from './HelperBase';

export default class MovieDBClient extends HelperBase {
  private helperBase: HelperBase;
  
  constructor() {
    super();
    
    this.helperBase = new HelperBase();

    if (process.env.REACT_APP_MOVIEDB_API_BEARER_KEY) {
      this.helperBase.headers.append('Authorization', `Bearer ${process.env.REACT_APP_MOVIEDB_API_BEARER_KEY}`);
    } else {
      console.error(`Cannot find enviromental variable: 'REACT_APP_MOVIEDB_API_BEARER_KEY', make sure to have it setup.`);
    }
  }

  public async getMedia(type: string, id: number) {
    return await (await fetch(`https://api.themoviedb.org/3/${type}/${id}`, { headers: this.helperBase.headers, method: 'GET' })).json();
  }

  public async search(type: string, query: string, page: number) {
    return await (await fetch(`https://api.themoviedb.org/3/search/${type}?&query=${query}&page=${page}`, { headers: this.helperBase.headers, method: 'GET' })).json();
  }

  public async getImageUrl(size: string, id: number, type: string): Promise<string> {
    return `https://image.tmdb.org/t/${type}/${size}/${id}`;
  }
}