<script setup lang="ts">
  import { useAuthStore } from '@tituskirch/app-base/stores/auth';
  const props = defineProps<{
    confirmPasswordButtonTitle?: string;
    confirmPasswordButtonProps?: Record<'block', unknown>;
    confirmPasswordButtonCallback?: () => void;
  }>();
  defineSlots<{
    confirmPasswordButton?: HTMLElement;
    default: HTMLElement;
  }>();

  const authStore = useAuthStore();
  const { getColorByType } = useAlertStyle();

  if (props.confirmPasswordButtonCallback) {
    authStore.setUserPasswordConfirmModalSuccessCallback({
      callback: props.confirmPasswordButtonCallback,
    });
  }
</script>

<template>
  <div class="w-full">
    <slot v-if="authStore.userPasswordConfirmed" />
    <slot v-else name="confirmPasswordButton">
      <UButton
        icon="i-fa6-solid-lock"
        :color="getColorByType({ type: 'warning' })"
        v-bind="confirmPasswordButtonProps"
        @click="authStore.showUserPasswordConfirmModal()"
      >
        {{
          confirmPasswordButtonTitle
            ? confirmPasswordButtonTitle
            : $t('global.action.auth.confirmPassword.label')
        }}
      </UButton>
    </slot>
  </div>
</template>
