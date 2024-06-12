<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';

  const { me } = useUser();
  const user = await me();

  // classes for same style
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
  const twoFactorQrCodeSecret = computed(() => {
    return twoFactorQrCodeData.value?.url?.split('?secret=')[1]?.split('&')[0];
  });

  // disable two factor authentication
  const { disableTwoFactorAuthentication } = useAuth();
  const {
    status: disableTwoFactorAuthenticationStatus,
    execute: disableTwoFactorAuthenticationExecute,
  } = await disableTwoFactorAuthentication();
  const disableTwoFactorAuthenticationClick = async () => {
    await disableTwoFactorAuthenticationExecute();
  };

  // form setup
  type TwoFactorAuthenticationConfirmForm = AuthUserConfirmedTwoFactorAuthenticationData;
  const confirmedTwoFactorAuthenticationForm: Ref<TwoFactorAuthenticationConfirmForm> = ref({
    code: '',
  });
  const confirmedTwoFactorAuthenticationFormErrorMessages: Ref<Record<string, string> | false> =
    ref({});
  const { setErrors } = useFormKit();

  const { confirmedTwoFactorAuthentication } = useAuth();
  const {
    status: confirmedTwoFactorAuthenticationStatus,
    execute: confirmedTwoFactorAuthenticationExecute,
    error: confirmedTwoFactorAuthenticationError,
  } = await confirmedTwoFactorAuthentication({
    data: confirmedTwoFactorAuthenticationForm,
  });
  const submitConfirmedTwoFactorAuthentication = async (
    data: TwoFactorAuthenticationConfirmForm,
    node: FormKitNode
  ) => {
    await confirmedTwoFactorAuthenticationExecute();
    confirmedTwoFactorAuthenticationFormErrorMessages.value =
      setErrors<AuthUserConfirmedTwoFactorAuthenticationData>({
        node,
        error: confirmedTwoFactorAuthenticationError.value?.data,
      });
  };

  // error handling
  watch(
    confirmedTwoFactorAuthenticationForm,
    (
      newValue: TwoFactorAuthenticationConfirmForm,
      oldValue: TwoFactorAuthenticationConfirmForm
    ) => {
      const updatedErrorMessages: typeof confirmedTwoFactorAuthenticationFormErrorMessages.value =
        {};
      for (const key of Object.keys(newValue) as Array<keyof TwoFactorAuthenticationConfirmForm>) {
        if (
          newValue[key] === oldValue[key] &&
          confirmedTwoFactorAuthenticationFormErrorMessages.value != false &&
          confirmedTwoFactorAuthenticationFormErrorMessages.value[key]
        ) {
          6;
          updatedErrorMessages[key] = confirmedTwoFactorAuthenticationFormErrorMessages.value[key];
        }
      }
      confirmedTwoFactorAuthenticationFormErrorMessages.value = updatedErrorMessages;
    }
  );
</script>

<template>
  <div>
    <UDashboardSection
      :title="$t('page.settings.security.section.twoFactorAuthentication.title')"
      :description="$t('page.settings.security.section.twoFactorAuthentication.description')"
    >
      <template #links>
        <AuthNeedsToConfirmUserPasswordButton
          v-if="!twoFactorQrCodeData?.svg"
          :confirm-password-button-title="
            $t(
              'page.settings.security.section.twoFactorAuthentication.action.confirmPasswordAndEnable.label'
            )
          "
          :confirm-password-button-props="{ block: true }"
          :confirm-password-button-callback="enableTwoFactorAuthenticationClick"
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
          class="flex items-center justify-center w-full flex-col space-y-4 overflow-hidden"
        >
          <div
            class="inline-block rounded-lg p-2 bg-white -mx-2 text-black"
            v-html="twoFactorQrCodeData?.svg.replace('#2d3748', 'currentColor')"
          />

          <div class="text-sm text-gray-500 flex flex-col items-center gap-1">
            <div class="text-wrap">
              {{ $t('page.settings.security.section.twoFactorAuthentication.qrCode.description') }}
            </div>
            <div class="inline-flex items-center bg-gray-950 rounded-lg px-2 py-1 gap-1">
              <code>{{ twoFactorQrCodeSecret }}</code>
              <CopyButton
                v-if="twoFactorQrCodeSecret"
                :value="twoFactorQrCodeSecret"
                color="gray"
                class="p-0"
              />
            </div>
          </div>

          <FormKit
            v-slot="{ state: { valid } }"
            v-model="confirmedTwoFactorAuthenticationForm"
            type="form"
            :actions="false"
            :disabled="confirmedTwoFactorAuthenticationStatus === 'success'"
            @submit="submitConfirmedTwoFactorAuthentication"
            :classes="{
              form: 'w-full',
            }"
          >
            <FormErrorsAlert
              v-if="confirmedTwoFactorAuthenticationFormErrorMessages"
              :error-messages="confirmedTwoFactorAuthenticationFormErrorMessages"
            />

            <FormKit
              type="otp"
              name="code"
              :label="
                $t('page.settings.security.section.twoFactorAuthentication.form.confirm.label')
              "
              validation="required"
            />

            {{ !valid }}
            {{
              confirmedTwoFactorAuthenticationFormErrorMessages &&
              !!Object.keys(confirmedTwoFactorAuthenticationFormErrorMessages).length
            }}

            <UButton
              type="submit"
              block
              :disabled="
                !valid || !!Object.keys(confirmedTwoFactorAuthenticationFormErrorMessages).length
              "
              :loading="confirmedTwoFactorAuthenticationStatus === 'pending'"
              icon="i-fa6-solid-floppy-disk"
              >{{ $t('global.action.save.label') }}</UButton
            >
          </FormKit>

          {{ confirmedTwoFactorAuthenticationForm }}
        </div>
      </template>
    </UDashboardSection>
    <!-- render twoFactorQrCodeData?.svg here -->
  </div>
</template>
