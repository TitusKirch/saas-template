<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      type: AuthTwoFactorChallengeType;
    }>(),
    {
      type: 'code',
    }
  );

  const form: Ref<any> = ref({
    code: '',
    recovery_code: '',
  });
</script>

<template>
  <div class="space-y-6">
    <FormKit v-slot="{ state: { valid } }" v-model="form" type="form" :actions="false">
      <!-- 
          :disabled="status === 'success'"
      @submit="submit"
    -->
      <FormKit
        v-if="type === 'code'"
        type="otp"
        name="code"
        :label="$t('global.twoFactorChallenge.code.label')"
        validation="required"
      />

      <FormKit
        v-else-if="type === 'recoveryCode'"
        type="password"
        name="recovery_code"
        :label="$t('global.twoFactorChallenge.recoveryCode.label')"
        validation="required"
        prefix-icon="password"
      />

      <!--  
      :disabled="!valid || !!Object.keys(errorMessages).length"
        :loading="status === 'pending' || (status !== 'idle' && !error)"
         -->

      <UButton
        type="submit"
        block
        icon="i-fa6-solid-right-to-bracket"
        :ui="{
          base: 'mt-8',
        }"
        >{{ $t('global.action.auth.login.label') }}</UButton
      >
    </FormKit>
  </div>
</template>
