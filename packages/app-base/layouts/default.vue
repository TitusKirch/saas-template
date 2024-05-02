<script setup lang="ts">
  const randomColor = (e: any) => {
    const hex = Math.floor(Math.random() * 16777215).toString(16)
    e.target.setAttribute('style', 'background-color: #' + hex + '88;')
  }
</script>

<template>
  <div>
    <UDashboardNavbar title="Inbox" badge="5" />

    <HelloApp />

    {{ $t('base.foo') }}

    <h1>This app is:</h1>

    <slot />

    <FormKit type="button" help="You can bind event listeners." @click="randomColor">
      Click me!
    </FormKit>
  </div>
</template>
