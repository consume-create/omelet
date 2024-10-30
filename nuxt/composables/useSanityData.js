export default async function ({ query, params, livePreview = true }) {
  const store = useStore();
  const sanityClient = store.preview_is_active
    ? {
        client: 'preview',
        server: false,
        initialCache: false,
      }
    : undefined;

  // Live preview: listen to changes
  onMounted(() => {
    if (store.preview_is_active && livePreview) {
      const sanity = useSanity('preview');
      sanity.client.listen(query, params).subscribe((event) => {
        setTimeout(() => {
          refresh();
        }, 900);
      })
    }
  });

  // get data
  const { data, refresh } = await useLazySanityQuery(
    query,
    params,
    sanityClient
  );

  return data;
}
