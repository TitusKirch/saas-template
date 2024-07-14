<script setup lang="ts">
  const { me, getMeAvatarPresignedUrl } = useUser();
  const user = await me();

  // update user avatar
  const getMeAvatarPresignedUrlData = ref<UpdateUsersMeAvatarData | undefined>();

  const { execute: executeUpdateMeAvatar, data: avatarPresignedUrlData } = getMeAvatarPresignedUrl({
    data: getMeAvatarPresignedUrlData,
  });
  const clickAvatarChange = () => {
    const input = document.querySelector('input[type="file"][name="avatar"]');
    if (input && input instanceof HTMLElement) {
      input.click();
    }
  };
  const { uploadFileByPresignedUrl } = useS3();
  const changeAvatarInputChanged = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const formData = new FormData();
      formData.append('avatar', fileInput.files[0]);

      console.info('Avatar data', formData.get('avatar'));

      // Update the avatar data ref
      getMeAvatarPresignedUrlData.value = formData;

      // Execute the update avatar function
      try {
        await executeUpdateMeAvatar();
        console.info('Avatar updated');
      } catch (error) {
        console.error('Error updating avatar:', error);
        return;
      }

      if (!avatarPresignedUrlData.value) {
        console.error('No avatar presigned url data');
        return;
      }

      // await uploadFileByPresignedUrl({
      //   presignedUrl: avatarPresignedUrlData.value.data.presignedUrl,
      //   file: fileInput.files[0],
      // });
    }
  };

  // form setup
  const form = ref<UpdateUsersMeData>({
    first_name: user.value?.first_name || '',
    last_name: user.value?.last_name || '',
    email: user.value?.email || '',
    password: '',
    password_confirmation: '',
  });
  const formValuesBeforeSubmit = ref<UpdateUsersMeData>({ ...form.value });
  const { passwordToggle } = useFormKit();
  const formValuesHasChanged = computed(() => {
    return Object.keys(form.value).some(
      (key) =>
        form.value[key as keyof UpdateUsersMeData] !==
        formValuesBeforeSubmit.value[key as keyof UpdateUsersMeData]
    );
  });
  const { updateMe, refetchMe } = useUser();
  const { t } = useI18n();
  const { error, status, execute } = await updateMe({
    data: form,
  });
  const { submit, errorMessages } = useFormKitForm<UpdateUsersMeData>({
    form,
    error,
    status,
    executeCallback: execute,
    successCallback: async () => {
      await refetchMe();

      formValuesBeforeSubmit.value = { ...form.value };

      useNotification({
        type: 'success',
        title: t('global.notification.success.title'),
        description: t('page.settings.account.notification.success.description'),
      });
    },
  });

  // classes for same style
  // const dashboardSectionLinksDivClasses = 'flex flex-col w-full md:w-auto md:min-w-80';
  const formkitFieldClasses = {
    label: '$reset hidden',
  };

  // TODO: Use correct type here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = ref<any | null>(null);
</script>

<template>
  <div>
    <UDashboardSection
      :title="$t('page.settings.account.section.avatar.title')"
      :description="$t('page.settings.account.section.avatar.description')"
    >
      <template #links>
        <div class="relative group">
          <UAvatar size="3xl" :src="user?.avatar" :alt="`${user?.first_name} ${user?.last_name}`" />

          {{ getMeAvatarPresignedUrlData }}
          {{ avatarPresignedUrlData }}

          <input
            type="file"
            name="avatar"
            accept=".jpeg,.jpg,.png,.bmp,.gif,.svg,.webp"
            class="hidden"
            @change="changeAvatarInputChanged"
          />

          <div
            @click="clickAvatarChange"
            class="group-hover:cursor-pointer text-transparent group-hover:text-white flex group-hover:bg-opacity-50 rounded-full absolute bottom-0 right-0 w-full h-full bg-black bg-opacity-0 items-center justify-center transition-all duration-300"
          >
            <UIcon name="i-fa6-solid-camera" class="text-3xl" />
          </div>
        </div>
      </template>
    </UDashboardSection>

    <UDivider class="mb-4" />
    <FormKit
      ref="formRef"
      v-slot="{ state: { valid } }"
      v-model="form"
      type="form"
      :actions="false"
      :disabled="status === 'success'"
      @submit="submit"
    >
      <UDashboardSection
        :title="$t('page.settings.account.section.name.title')"
        :description="$t('page.settings.account.section.name.description')"
      >
        <template #links>
          <FormKit
            type="text"
            name="first_name"
            :label="$t('global.first_name.label')"
            validation="required"
            :placeholder="$t('global.first_name.label')"
            prefix-icon="people"
            :classes="formkitFieldClasses"
          />
          <FormKit
            type="text"
            name="last_name"
            :label="$t('global.last_name.label')"
            validation="required"
            :placeholder="$t('global.last_name.label')"
            prefix-icon="people"
            :classes="formkitFieldClasses"
          />
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.email.label')"
        :description="$t('page.settings.account.section.email.description')"
      >
        <template #links>
          <FormKit
            type="text"
            name="email"
            :label="$t('global.email.label')"
            validation="required|email"
            :placeholder="usePlaceholder({ type: 'email' })"
            prefix-icon="email"
            :classes="formkitFieldClasses"
            autocomplete="username"
          />
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.password.label')"
        :description="$t('page.settings.account.section.password.description')"
      >
        <template #links>
          <FormKit
            type="password"
            name="password"
            :label="$t('global.password.label')"
            :placeholder="$t('global.password.label')"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            :classes="formkitFieldClasses"
            autocomplete="new-password"
            @suffix-icon-click="passwordToggle"
          />
          <FormKit
            type="password"
            name="password_confirmation"
            :label="$t('global.password_confirmation.label')"
            validation="confirm:password"
            :placeholder="$t('global.password_confirmation.label')"
            prefix-icon="password"
            suffix-icon="eyeClosed"
            :classes="formkitFieldClasses"
            autocomplete="new-password"
            @suffix-icon-click="passwordToggle"
          />
        </template>
      </UDashboardSection>

      <UDashboardSection>
        <template #links>
          <AuthNeedsToConfirmUserPasswordButton
            :confirm-password-button-props="{ block: true, disabled: !formValuesHasChanged }"
            :confirm-password-button-callback="() => formRef?.node.submit()"
            :confirm-password-button-title="$t('global.action.confirmPasswordAndSave.label')"
          >
            <UButton
              type="submit"
              block
              :disabled="!valid || !!Object.keys(errorMessages).length || !formValuesHasChanged"
              :loading="status === 'pending'"
              icon="i-fa6-solid-floppy-disk"
              >{{ $t('global.action.save.label') }}</UButton
            >
          </AuthNeedsToConfirmUserPasswordButton>
        </template>
      </UDashboardSection>
    </FormKit>
  </div>
</template>

Request URL:
http://127.0.0.1:9000/default/avatars/20644937343308938/66941eb8286ff.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minio%2F20240714%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240714T185344Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=fabda58fb61b80a2dc5cb64c25020adffb73e46f61210e58bb1528113a0ae861
Request Method: PUT Status Code: 403 Forbidden Remote Address: 127.0.0.1:9000 Referrer Policy:
no-referrer Accept-Ranges: bytes Access-Control-Allow-Credentials: true Access-Control-Allow-Origin:
http://localhost:3000 Access-Control-Expose-Headers: Date, Etag, Server, Connection, Accept-Ranges,
Content-Range, Content-Encoding, Content-Length, Content-Type, Content-Disposition, Last-Modified,
Content-Language, Cache-Control, Retry-After, X-Amz-Bucket-Region, Expires, X-Amz*, X-Amz*, *
Connection: close Content-Length: 499 Content-Type: application/xml Date: Sun, 14 Jul 2024 18:53:44
GMT Server: MinIO Strict-Transport-Security: max-age=31536000; includeSubDomains Vary: Origin Vary:
Accept-Encoding X-Amz-Id-2: dd9025bab4ad464b049177c95eb6ebf374d3b3fd1af9251148b658df7ac2e3e8
X-Amz-Request-Id: 17E2291FCFDC7595 X-Content-Type-Options: nosniff X-Xss-Protection: 1; mode=block
Accept: */* Accept-Encoding: gzip, deflate, br, zstd Accept-Language:
de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7 Cache-Control: no-cache Connection: keep-alive Content-Length:
410932 Content-Type: image/jpeg Host: 127.0.0.1:9000 Origin: http://localhost:3000 Pragma: no-cache
Sec-Ch-Ua: "Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126" Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Windows" Sec-Fetch-Dest: empty Sec-Fetch-Mode: cors Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/126.0.0.0 Safari/537.36mi
