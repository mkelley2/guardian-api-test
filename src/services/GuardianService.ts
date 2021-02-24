import axios from "axios";
import { SearchResponse } from "../types";

const apiKey = "5163a980-c54d-411a-9ffa-439b55ed2e66";
const apiUrl = "https://content.guardianapis.com/";

export const search = async (searchTerm: string, page: number) => {
  try {
    const { data }: { data: SearchResponse } = await axios.get(
      apiUrl + "search",
      {
        params: {
          "api-key": apiKey,
          "show-fields": "lastModified,thumbnail,trailText,starRating,byline",
          "page-size": 10,
          page,
          q: searchTerm,
        },
      }
    );

    return {
      code: 200,
      data,
    };
  } catch (error) {
    return {
      code: error.status,
      message: error.message,
    };
  }
};
