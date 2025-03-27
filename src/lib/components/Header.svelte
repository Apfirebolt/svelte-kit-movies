<script lang="ts">
	export let title: string = 'Svelte Kit Movies';
</script>

<header class="bg-midnight text-white">
	<div class="container mx-auto flex items-center justify-between px-6 py-4">
		<h1 class="text-2xl font-bold">{title}</h1>
		<nav>
			<ul class="flex space-x-6">
				<li>
					<a href="/" data-sveltekit-prefetch class="hover:text-gray-400">Home</a>
				</li>
				<li>
					<a href="/about" data-sveltekit-prefetch class="hover:text-gray-400">About</a>
				</li>
				<li>
					<a href="/contact" data-sveltekit-prefetch class="hover:text-gray-400">Contact</a>
				</li>
				<li>
					<a href="/movies" data-sveltekit-prefetch class="hover:text-gray-400">Movies</a>
				</li>
			</ul>
		</nav>
	</div>
</header>
