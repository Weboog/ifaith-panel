export interface Program{
  entry_id: number,
  content_id: string,
  content_source: string,
  program_type: string,
  program_id : string,
  program_title: string,
  episode_title: string,
  description: string,
  rating: string,
  frequency: string,
  air_datetime: string,
  playlist_date: string,
  date: string,
  time: string,
  thumbnail: string,
  path: string
}
export interface Guide {
  status: string;
  assets: {};
  info: {};
  copy: {};
  originals: [];
  data: Program[];
  cached: string
}
