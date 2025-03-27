<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import HeaderComponent from '$lib/components/Header.svelte';
	import FooterComponent from '$lib/components/Footer.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Icon from '@iconify/svelte';

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

	let text = 'Welcome to Svelte Movies';
	let displayedText = '';
	let index = 0;

	// Typewriter effect logic
	const typeWriter = () => {
		if (index < text.length) {
			displayedText += text[index];
			index++;
			setTimeout(typeWriter, 100); // Adjust speed here
		}
	};

	// Start the typewriter effect when the component is mounted
	typeWriter();

	onMount(() => {
		fetchMovies();
	});
</script>

<svelte:head>
	<title>Movies - Browse Latest Movies</title>
	<meta
		name="description"
		content="Explore a collection of the latest movies, including genres, ratings, and more. Find your next favorite movie here!"
	/>
</svelte:head>

<HeaderComponent title="Movies" />
{#if loading}
	<Loader />
{:else if error}
	<p class="text-red-500">Error loading movies: {error.message}</p>
{:else}
	<div>
		<section
			class="relative h-[500px] bg-cover bg-center"
			style="background-image: url('https://plus.unsplash.com/premium_photo-1710409625244-e9ed7e98f67b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
		>
			<div
				class="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-transparent to-black"
			>
				<div class="text-center text-white">
					<h1 class="mb-4 text-4xl font-bold md:text-6xl">
						{displayedText}
					</h1>
					<p class="mb-6 text-lg md:text-xl">Discover your favorite movies and more</p>
                    <div class="flex justify-center mx-auto">
                        <input
                            type="text"
                            placeholder="Search for movies..."
                            class="mr-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </div>
				</div>
			</div>
		</section>
		<div class="container mx-auto">
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each movies as movie}
					<div class="rounded-lg bg-accent-light p-4 shadow-md">
						<h2 class="text-lg font-bold">{movie.Movie_Name}</h2>
						<p class="text-gray-600">Year: {movie.Year}</p>
						<p class="text-gray-600">Genre: {movie.Genre}</p>
						<p class="text-gray-600">Rating: {movie.Rating}</p>
						<button
							class="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
							on:click={() => goToMovieDetails(movie)}
						>
							<Icon icon="mdi:eye" class="mr-2 inline-block" />
							View Details
						</button>
					</div>
				{/each}
			</div>
			<div class="mt-4 flex justify-center mb-3">
                <button
                    class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center"
                    on:click={goToPreviousPage}
                    disabled={!previous}
                >
                    <Icon icon="mdi:arrow-left" class="mr-2" />
                    Previous
                </button>
                <button
                    class="rounded bg-blue-500 px-4 py-2 mx-2 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center"
                    on:click={goToNextPage}
                    disabled={!next}
                >
                    Next
                    <Icon icon="mdi:arrow-right" class="ml-2" />
                </button>
			</div>
		</div>
	</div>
{/if}

<FooterComponent />
