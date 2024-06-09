<script setup lang="ts">
  const { locale, locales, setLocale } = useI18n();

  const { t } = useI18n();
  const options = computed(() =>
    locales.value.map((locale) => ({
      label: t(`locale.${locale.code}.label`),
      value: locale.code,
    }))
  );

  const preference = ref(
    options.value.find((option) => option.value === locale.value)?.value || options.value[0].value
  );
  watch(preference, (value) => {
    console.log(value);
    setLocale(value);
  });
</script>

<template>
  <ClientOnly>
    <FormKit v-model="preference" type="dropdown" name="preference" popover :options="options">
      <template #option="{ option, classes }">
        <FormDropdownOption :option="option" :classes="classes">
          <template #icon>
            <div class="flex w-5 items-center justify-center mr-2">
              <CountryFlag
                :country="option.value.split('-')[1].toLowerCase()"
                size="normal"
                class="!-m-4"
              />
            </div>
          </template>
        </FormDropdownOption>
      </template>
    </FormKit>

    <template #fallback>
      <FormKit
        v-model="preference"
        type="dropdown"
        name="preference"
        popover
        :options="options"
        disabled
      >
        <template #option="{ option, classes }">
          <FormDropdownOption :option="option" :classes="classes">
            <template #icon>
              <div class="flex w-5 items-center justify-center mr-2">
                <CountryFlag
                  :country="option.value.split('-')[1].toLowerCase()"
                  size="normal"
                  class="!-m-4"
                />
              </div>
            </template>
          </FormDropdownOption>
        </template>
      </FormKit>
    </template>
  </ClientOnly>
</template>
