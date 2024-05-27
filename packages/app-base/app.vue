<script setup lang="ts">
  import { changeLocale } from '@formkit/vue';

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

  // notifications
  const translateNotification = ({ text }: { text: string }) => {
    // check if text is in the pattern string.string... (e.g. "page.dashboard.index.title")
    if (text.includes('.') && !text.includes(' ')) {
      return t(text);
    }

    return text;
  };
  const styleNotification = ({
    text,
    skipTranslate = false,
  }: {
    text: string;
    skipTranslate?: boolean;
  }) => {
    let result = text;

    // translate if not skipped
    if (!skipTranslate) {
      result = translateNotification({ text });
    }

    // match for "..." and replace with "<strong>...</strong>"
    return result.replace(/"(.*?)"/g, '"<strong>$1</strong>"');
  };

  // set formkit locale
  const { locale } = useI18n();
  watch(locale, (newLocale) => {
    changeLocale(newLocale.split('-')[0]);
  });
  changeLocale(locale.value.split('-')[0]);
</script>

<template>
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
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <UNotifications>
        <template #title="{ title }">
          <span>{{ translateNotification({ text: title }) }}</span>
        </template>
        <template #description="{ description }">
          <span
            v-html="
              styleNotification({
                text: description,
              })
            "
          />
        </template>
      </UNotifications>
    </Body>
  </Html>
</template>
