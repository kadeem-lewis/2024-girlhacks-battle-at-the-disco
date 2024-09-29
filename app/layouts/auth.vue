<template>
  <div class="flex min-h-screen flex-col items-center justify-between gap-y-4">
    <header class="w-full border-b bg-gray-800 py-2">
      <UContainer>
        <h1 class="text-2xl font-bold uppercase">BATTLE! AT THE DISCO</h1>
      </UContainer>
    </header>
    <UContainer class="w-full grow">
      <main class="w-full">
        <NuxtPage />
      </main>
      <footer class="bg-gray-800 text-center">
        <p>&copy; 2024</p>
      </footer>
    </UContainer>
  </div>
</template>

<script setup lang="ts"></script>
