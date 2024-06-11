<script setup lang="ts">
  const { me } = useUser();
  const user = await me();

  // classes for same style
  const dashboardSectionUiClasses = {
    container: 'items-start',
    links: 'w-full md:w-auto md:min-w-80',
  };
  const dashboardSectionLinksDivClasses = 'flex flex-col w-full md:w-auto md:min-w-80';
  const formkitFieldClasses = {
    label: '$reset hidden',
  };

  // TODO: Use correct type here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = ref<any | null>(null);

  // get two factor qr code
  const { enableTwoFactorAuthentication, twoFactorQrCode } = useAuth();

  const {
    status: enableTwoFactorAuthenticationStatus,
    execute: enableTwoFactorAuthenticationExecute,
  } = await enableTwoFactorAuthentication();
  const enableTwoFactorAuthenticationClick = async () => {
    await enableTwoFactorAuthenticationExecute();
  };
  const {
    data: twoFactorQrCodeData,
    status: twoFactorQrCodeStatus,
    execute: twoFactorQrCodeExecute,
  } = await twoFactorQrCode();
  watch(
    () => enableTwoFactorAuthenticationStatus.value,
    async (status) => {
      if (status === 'success') {
        await twoFactorQrCodeExecute();
      }
    }
  );

  // disable two factor authentication
  const { disableTwoFactorAuthentication } = useAuth();
  const {
    status: disableTwoFactorAuthenticationStatus,
    execute: disableTwoFactorAuthenticationExecute,
  } = await disableTwoFactorAuthentication();
  const disableTwoFactorAuthenticationClick = async () => {
    await disableTwoFactorAuthenticationExecute();
  };

  const form = ref({
    otp: '',
  });
</script>

<template>
  <div>
    <UDashboardSection
      :title="$t('page.settings.security.section.twoFactorAuthentication.title')"
      :description="$t('page.settings.security.section.twoFactorAuthentication.description')"
      :ui="{
        ...dashboardSectionUiClasses,
      }"
    >
      <template #links>
        <AuthNeedsToConfirmUserPasswordButton
          :confirm-password-button-props="{ block: true }"
          :confirm-password-button-callback="() => formRef?.node.submit()"
        >
          <UButton
            block
            icon="i-fa6-solid-lock"
            :loading="
              enableTwoFactorAuthenticationStatus === 'pending' ||
              twoFactorQrCodeStatus === 'pending'
            "
            :disabled="twoFactorQrCodeData?.svg"
            @click="enableTwoFactorAuthenticationClick"
          >
            {{ $t('page.settings.security.section.twoFactorAuthentication.action.enable.label') }}
          </UButton>
          <!-- <UButton
            block
            icon="i-fa6-solid-unlock"
            :loading="disableTwoFactorAuthenticationStatus === 'pending'"
            color="red"
            @click="disableTwoFactorAuthenticationClick"
          >
            {{ $t('page.settings.security.section.twoFactorAuthentication.action.disable.label') }}
          </UButton> -->
        </AuthNeedsToConfirmUserPasswordButton>

        <div
          v-if="twoFactorQrCodeData?.svg"
          class="flex items-center justify-center w-full mt-8 flex-col space-y-4 overflow-hidden"
        >
          <div
            class="inline-block rounded-lg p-2 bg-white -mx-2"
            v-html="twoFactorQrCodeData?.svg"
          />

          <div class="text-sm text-gray-500">
            {{ $t('page.settings.security.section.twoFactorAuthentication.qrCode.description') }}
          </div>

          <FormKit type="form" @submit="() => {}" v-model="form">
            <FormKit type="otp" validation="required" name="otp" />
          </FormKit>

          {{ form }}
        </div>
      </template>
    </UDashboardSection>
    <!-- render twoFactorQrCodeData?.svg here -->
  </div>
</template>
