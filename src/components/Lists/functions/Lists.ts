import { IListItem } from "../interfaces/Lists";

export function getListItem(item: any, type: string): IListItem {
  if (item) {
    switch(type) {
      case 'movie':
        return { mediaType: type, id: item.id, title: item.title, releaseDate: item.release_date };
      case 'tv':
        return { mediaType: type, id: item.id, title: item.name, releaseDate: item.first_air_date };
      case 'anime':
      case 'game':
        console.error('Cannot get IListItem from type anime or movie at the moment.');
        return { id: -1, title: 'missing_title', mediaType: 'none', releaseDate: null };
      default:
        return { id: -1, title: 'missing_title', mediaType: 'none', releaseDate: null };
    }
  }
}