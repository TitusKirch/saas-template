<script setup lang="ts">
  const { me } = useUser();
  const user = await me();
  const { passwordToggle } = useFormKit();

  // form setup
  const form = ref({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    email_confirm: user?.email || '',
    password: '',
    password_confirm: '',
  });

  // classes for same style
  const dashboardSectionUiClasses = {
    container: 'items-start',
    links: 'w-full md:w-auto md:min-w-80',
  };
  const dashboardSectionLinksDivClasses = 'flex flex-col w-full md:w-auto md:min-w-80';
  const formkitFieldClasses = {
    label: '$reset hidden',
  };
</script>

<template>
  <div>
    <!-- :disabled="status === 'success'"
      @submit="submit" -->
    <FormKit type="form" v-model="form" :actions="false" #default="{ state: { valid } }">
      <UDashboardSection
        :title="$t('page.settings.account.section.name.title')"
        :description="$t('page.settings.account.section.name.description')"
        :ui="{
          ...dashboardSectionUiClasses,
        }"
      >
        <template #links>
          <div :class="dashboardSectionLinksDivClasses">
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
          </div>
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.email.label')"
        :description="$t('page.settings.account.section.email.description')"
        :ui="{
          ...dashboardSectionUiClasses,
        }"
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
          />
        </template>
      </UDashboardSection>

      <UDivider class="mb-4" />

      <UDashboardSection
        :title="$t('global.password.label')"
        :description="$t('page.settings.account.section.password.description')"
        :ui="{
          ...dashboardSectionUiClasses,
        }"
      >
        <template #links>
          <div :class="dashboardSectionLinksDivClasses">
            <FormKit
              type="password"
              name="password"
              :label="$t('global.password.label')"
              validation="required"
              :placeholder="$t('global.password.label')"
              prefix-icon="password"
              suffix-icon="eyeClosed"
              @suffix-icon-click="passwordToggle"
              :classes="formkitFieldClasses"
            />
            <FormKit
              type="password"
              name="password_confirm"
              :label="$t('global.password_confirm.label')"
              validation="required|confirm"
              :placeholder="$t('global.password_confirm.label')"
              prefix-icon="password"
              suffix-icon="eyeClosed"
              @suffix-icon-click="passwordToggle"
              :classes="formkitFieldClasses"
            />
          </div>
        </template>
      </UDashboardSection>
    </FormKit>
  </div>
</template>
