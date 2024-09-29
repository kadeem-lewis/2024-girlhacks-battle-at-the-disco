export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  // redirect the user to the login page
  if (!user) {
    return navigateTo({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  }
  //   if (user && to.path === "/" && from.path !== "/") {
  //     return navigateTo({
  //       path: from.fullPath,
  //     });
  //   }
});
