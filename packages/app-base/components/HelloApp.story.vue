<script lang="ts" setup>
  import HelloApp from './HelloApp.vue';
</script>

<template>
  <Story
    title="HelloApp"
    :layout="{
      type: 'grid',
    }"
  >
    <Variant title="HelloApp">
      <HelloApp :to-lower-case="false" />
    </Variant>
    <Variant title="HelloApp to lower case">
      <HelloApp :to-lower-case="true" />
    </Variant>
  </Story>
</template>
