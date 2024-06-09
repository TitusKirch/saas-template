<script setup lang="ts">
  import { changeLocale } from '@formkit/vue';
  import { useAuthStore } from '@tituskirch/app-base/stores/auth';

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

  // user password confirmed reset
  const authStore = useAuthStore();
  const resetUserPasswordConfirmedTimout: Ref<NodeJS.Timeout | undefined> = ref();
  const maxLifetime = 60 * 60 * 3 * 1000; // 3 hours
  const setResetUserPasswordConfirmedTimeout = () => {
    clearTimeout(resetUserPasswordConfirmedTimout.value);
    if (authStore.userPasswordConfirmedAt) {
      const timeOutIn =
        maxLifetime - (Date.now() - new Date(authStore.userPasswordConfirmedAt)?.getTime());
      resetUserPasswordConfirmedTimout.value = setTimeout(() => {
        authStore.resetUserPasswordConfirmed();
      }, timeOutIn);
    }
  };
  setResetUserPasswordConfirmedTimeout();
  watch(
    () => authStore.userPasswordConfirmedAt,
    () => {
      setResetUserPasswordConfirmedTimeout();
    }
  );
  const { me } = useUser();
  const user = await me();
  if (user) {
    const { userConfirmedPasswordStatus } = useAuth();
    const { data: userConfirmedPasswordStatusData, execute: userConfirmedPasswordStatusExecute } =
      await userConfirmedPasswordStatus();
    await userConfirmedPasswordStatusExecute();
    if (!userConfirmedPasswordStatusData.value?.confirmed) {
      authStore.resetUserPasswordConfirmed();
    }
  }
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
        <template #title="{ title: notificationTitle }">
          <span>{{ translateNotification({ text: notificationTitle }) }}</span>
        </template>
        <template #description="{ description }">
          <!-- eslint-disable vue/no-v-html -->
          <span
            v-html="
              styleNotification({
                text: description,
              })
            "
          />
          <!-- eslint-enable vue/no-v-html -->
        </template>
      </UNotifications>
    </Body>
  </Html>
</template>
