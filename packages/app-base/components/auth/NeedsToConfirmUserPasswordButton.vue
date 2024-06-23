<script setup lang="ts">
  import { useAuthStore } from '@tituskirch/app-base/stores/auth';
  defineProps<{
    confirmPasswordButtonTitle?: string;
    confirmPasswordButtonProps?: Partial<Record<'block' | 'disabled', unknown>>;
    confirmPasswordButtonCallback: () => Promise<any>;
    disabled?: boolean;
  }>();
  defineSlots<{
    confirmPasswordButton?: HTMLElement;
    default: HTMLElement;
  }>();

  const authStore = useAuthStore();
  const { getColorByType } = useAlertStyle();
  const { hasPassword } = useUser();

  const modalIsOpen = ref(false);
</script>

<template>
  <div class="w-full">
    <slot v-if="authStore.userPasswordConfirmed" />
    <slot v-else name="confirmPasswordButton">
      <UTooltip
        v-if="!hasPassword()"
        :text="$t('auth.needsToConfirmUserPasswordButton.noPassword.tooltip')"
        :popper="{
          resize: true,
        }"
        :ui="{
          base: 'text-wrap h-auto',
        }"
      >
        <UButton
          icon="i-fa6-solid-lock"
          :color="getColorByType({ type: 'warning' })"
          :disabled="true"
        >
          {{ $t('auth.needsToConfirmUserPasswordButton.noPassword.label') }}
        </UButton>
      </UTooltip>
      <UButton
        v-else
        icon="i-fa6-solid-lock"
        :color="getColorByType({ type: 'warning' })"
        v-bind="confirmPasswordButtonProps"
        @click="modalIsOpen = true"
      >
        {{
          confirmPasswordButtonTitle
            ? confirmPasswordButtonTitle
            : $t('global.action.auth.confirmPassword.label')
        }}
      </UButton>
    </slot>

    <AuthUserPasswordConfirmModal
      v-model="modalIsOpen"
      :confirm-password-button-callback="confirmPasswordButtonCallback"
    />
  </div>
</template>
