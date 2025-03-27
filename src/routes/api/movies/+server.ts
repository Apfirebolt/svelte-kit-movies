import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

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

export const GET: RequestHandler = async () => {
  try {
    const response = await fetch('https://softgenie.org/api/movies');
    if (!response.ok) {
      return json({ error: `HTTP error! status: ${response.status}` }, { status: response.status });
    }
    const data: ApiResponse = await response.json();
    return json(data);
  } catch (error) {
    console.error('API Error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};