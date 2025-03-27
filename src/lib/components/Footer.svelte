<script lang="ts">
    export let year: number = new Date().getFullYear();
</script>

<footer class="bg-midnight text-white py-4">
    <div class="container mx-auto text-center">
        <p class="text-sm">
            &copy; {year} Sveltekit Movies. All rights reserved.
        </p>
    </div>
</footer>