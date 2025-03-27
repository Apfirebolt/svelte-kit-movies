<script lang="ts">
    export let title: string = "My Website";
</script>

<header class="bg-gray-800 text-white">
    <div class="container mx-auto flex justify-between items-center py-4 px-6">
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