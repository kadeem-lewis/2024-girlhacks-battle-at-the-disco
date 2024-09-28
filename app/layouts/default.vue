<template>
  <UContainer class="flex flex-col gap-2">
    <NavBar />
    <main>
      <slot />
    </main>
    <footer>
      <p>&copy; 2021</p>
    </footer>
  </UContainer>
</template>

<script setup lang="ts"></script>
