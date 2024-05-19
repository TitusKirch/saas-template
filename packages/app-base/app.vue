<script setup lang="ts">
  // head
  const route = useRoute();
  const { t } = useI18n();
  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
  });
  const title = computed(() => {
    if (route?.meta?.title) {
      return t('base.app.title', { title: t((route?.meta?.title as string) ?? 'Unknown') });
    }

    return t('base.app.fallbackTitle');
  });
  useHead({
    meta: [
      {
        property: 'og:title',
        content: title.value,
      },
      {
        property: 'og:description',
        content: t((route?.meta?.description as string) ?? 'base.app.fallbackDescription'),
      },
    ],
  });

  // csrf token
  onMounted(async () => {
    const { fetchCsrfToken } = useApi();
    await fetchCsrfToken();
  });
</script>

<template>
  <div>
    <Html :lang="head?.htmlAttrs?.lang" :dir="head?.htmlAttrs?.dir" class="h-full">
      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body class="h-full bg-muted-100 dark:bg-gray-950">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </Body>
    </Html>
  </div>
</template>
