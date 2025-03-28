interface Movie {
    ID: number;
    Movie_Name: string;
    Year: number;
    Timing: string;
    Rating: number;
    Votes: string;
    Genre: string;
    Language: string;
    Description: string; // Assuming the API provides a description
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

export type { Movie, ApiResponse };