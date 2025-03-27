<script lang="ts">
    
</script>
  
  <div class="fixed inset-0 flex justify-center items-center bg-tahiti bg-opacity-75 z-50">
    <div class="loader">
    </div>
  </div>
  
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loader {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top: 4px solid white;
        border-right: 4px solid var(--tw-ring-color, var(--tw-ring-offset-color, var(--tw-gradient-stops, var(--tw-bg-opacity, rgba(251, 146, 60, var(--tw-bg-opacity, 1))))));
        animation: spin 1s linear infinite;
    }
  </style>