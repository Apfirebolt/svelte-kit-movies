<script lang="ts">
    import HeaderComponent from '$lib/components/Header.svelte';
    import FooterComponent from '$lib/components/Footer.svelte';
    import Loader from '$lib/components/Loader.svelte';

    export let data; // Receive data from the load function in +page.server.ts

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

    $: movie = data.movie as Movie | null; // Assign data.movie to the movie variable.
</script>

<svelte:head>
    <title>{movie ? movie.Movie_Name : 'Loading...'}</title>
    <meta name="description" content={movie ? movie.Description : 'Loading movie details...'} />
</svelte:head>

<HeaderComponent title="Movie Details" />

{#if !movie}
    <Loader />
{:else}
    <div class="container mx-auto py-6">
        <h2 class="text-2xl font-bold">{movie.Movie_Name}</h2>
        <p class="text-gray-600">Year: {movie.Year}</p>
        <p class="text-gray-600">Genre: {movie.Genre}</p>
        <p class="text-gray-600">Rating: {movie.Rating}</p>
        <p class="text-gray-600">Language: {movie.Language}</p>
        <p class="text-gray-600">Description: {movie.Description}</p>
    </div>
{/if}

<FooterComponent />
