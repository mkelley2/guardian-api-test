import { Article } from "./Article";

export interface SearchResponse {
  response: Response;
}

export interface Response {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: Article[];
}
