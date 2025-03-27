// src/routes/your-page/+page.server.ts

import type { PageServerLoad } from './$types';

interface Movie {
  ID: number;
  Movie_Name: string;
  Year: number;
  Timing: string;
  Rating: number;
  Votes: string;
  Genre: string;
  Language: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

export const load: PageServerLoad = async () => {
  try {
    const response = await fetch('https://softgenie.org/api/movies');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    // console.log(data.results);
    return { movies: data.results }; // Return data to the page
  } catch (error) {
    console.error('API Error:', error);
    return { movies: [] }; // Handle errors gracefully
  }
};