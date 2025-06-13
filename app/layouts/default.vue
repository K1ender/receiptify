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

  --card-rounded: 0.5rem;
  --card-shadow-color: light-dark(#0e0e0e, #fefefe);
  --card-shadow-x: 1px;
  --card-shadow-y: 1px;
  --card-shadow-blur: 2px;
  --card-shadow-spread: 0;

  --padding-2: 0.125rem;
  --padding-3: 0.25rem;
  --padding-4: 0.5rem;
  --padding-5: 0.75rem;
  --padding-6: 1rem;
  --padding-7: 1.25rem;
  --padding-8: 1.5rem;
  --padding-9: 1.75rem;
  --padding-10: 2rem;
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

a {
  color: inherit;
  text-decoration: none;
}
</style>