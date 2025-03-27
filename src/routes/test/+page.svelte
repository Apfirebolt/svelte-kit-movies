<script lang="ts">
    import HeaderComponent from '$lib/components/Header.svelte';
    import FooterComponent from '$lib/components/Footer.svelte';
    export let data;
</script>

<svelte:head>
    <title>Movies List</title>
    <meta name="description" content="Browse through a list of amazing movies with details like year, genre, and rating." />
</svelte:head>

<HeaderComponent />
<div class="container mx-auto py-6">
    <h2 class="text-2xl font-bold">Movies</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.movies as movie (movie.ID)}
            <div class="rounded-lg bg-white p-4 shadow-md">
                <h2 class="text-lg font-bold">{movie.Movie_Name}</h2>
                <p class="text-gray-600">Year: {movie.Year}</p>
                <p class="text-gray-600">Genre: {movie.Genre}</p>
                <p class="text-gray-600">Rating: {movie.Rating}</p>
            </div>
        {/each}
    </div>
</div>
<FooterComponent />
