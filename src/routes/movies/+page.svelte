<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import HeaderComponent from '$lib/components/Header.svelte';
    import FooterComponent from '$lib/components/Footer.svelte';
    import Loader from '$lib/components/Loader.svelte';

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

    let movies: Movie[] = [];
    let loading: boolean = true;
    let error: Error | null = null;
    let next: string | null = null;
    let previous: string | null = null;

    async function fetchMovies(url: string = 'https://softgenie.org/api/movies') {
        try {
            loading = true;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: ApiResponse = await response.json();
            movies = data.results;
            next = data.next;
            previous = data.previous;
        } catch (err) {
            error = err instanceof Error ? err : new Error('An unknown error occurred');
        } finally {
            loading = false;
        }
    }

    function goToNextPage() {
        if (next) {
            fetchMovies(next);
        }
    }

    function goToPreviousPage() {
        if (previous) {
            fetchMovies(previous);
        }
    }

    const goToMovieDetails = (movie: Movie) => {
        goto(`/movies/${movie.ID}`);
    };

    onMount(() => {
        fetchMovies();
    });
</script>

<HeaderComponent title="Movies" />
{#if loading}
    <Loader />
{:else if error}
    <p class="text-red-500">Error loading movies: {error.message}</p>
{:else}
    <div class="container mx-auto py-6">
        <h2 class="text-2xl font-bold">Movies</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {#each movies as movie}
                <div class="rounded-lg bg-white p-4 shadow-md">
                    <h2 class="text-lg font-bold">{movie.Movie_Name}</h2>
                    <p class="text-gray-600">Year: {movie.Year}</p>
                    <p class="text-gray-600">Genre: {movie.Genre}</p>
                    <p class="text-gray-600">Rating: {movie.Rating}</p>
                    <button 
                        class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" 
                        on:click={() => goToMovieDetails(movie)}>
                        View Details
                    </button>
                </div>
            {/each}
        </div>
        <div class="flex justify-between mt-4">
            <button 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50" 
                on:click={goToPreviousPage} 
                disabled={!previous}>
                Previous
            </button>
            <button 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50" 
                on:click={goToNextPage} 
                disabled={!next}>
                Next
            </button>
        </div>
    </div>
{/if}

<FooterComponent />
