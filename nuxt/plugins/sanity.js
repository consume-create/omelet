export default defineNuxtPlugin(async () => {
  const store = useSiteStore();
  const route = useRoute();

  // Fetch global page data on start
  await store.fetchSiteContent();

  // Check if preview mode is active and set previewIsActive
  const preview = route.query.preview && route.query.preview === 'true';

  if (preview) {
    store.preview_is_active = true;
  }
});
