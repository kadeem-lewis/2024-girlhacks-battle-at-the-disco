<template>
  <div>
    <div class="background" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const user = useCurrentUser();

onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push("/");
    } else if (user && typeof route.query.redirect === "string") {
      // user logged in
      router.push(route.query.redirect);
    }
  });
});
</script>
<style scoped>
.background {
  background-image: url("/images/glamorous.svg");
  background-repeat: repeat;
  background-size: 400px 400px;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -20;
}
</style>
