<script lang="ts" setup>

</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style>
:root {
  color-scheme: light dark;

  --background-color: light-dark(#fefefe, #0e0e0e);
  --text-color: light-dark(#0e0e0e, #fefefe);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: "Inter", "sans-serif";
}
</style>