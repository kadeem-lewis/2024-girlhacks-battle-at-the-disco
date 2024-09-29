<template>
  <div class="flex min-h-screen flex-col items-center justify-between gap-y-4">
    <NavBar />
    <UContainer class="w-full grow">
      <main class="w-full">
        <NuxtPage />
      </main>
      <UNotifications />
    </UContainer>
    <footer class="w-full border-t bg-gray-800 py-2 text-center">
      <p>&copy; 2024</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
