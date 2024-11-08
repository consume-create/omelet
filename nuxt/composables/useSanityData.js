export default async function ({ query, params, live_preview = true }) {
  const store = useStore();
  const sanityClient = store.preview_is_active ? { client: 'preview', server: false, initialCache: false } : undefined;

  // Live preview: listen to changes
  onMounted(() => {
    if (store.preview_is_active && live_preview) {
      const sanity = useSanity('preview');
      sanity.client.listen(query, params).subscribe((event) => {
        setTimeout(() => {
          refresh();
        }, 1000);
      });
    }
  });

  const { data, refresh } = await useLazySanityQuery(query, params, sanityClient);

  return data;
}
