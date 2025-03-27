<script lang="ts">
    export let size: string = "8"; // Default size
    export let color: string = "blue-500"; // Default color
</script>

<div class={`flex justify-center items-center`}>
    <div
        class={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-${color}`}
    ></div>
</div>