<script setup lang="ts">
  useHead({
    bodyAttrs: {
      class: 'dark:bg-gray-950',
    },
  });
</script>

<template>
  <div id="layout-auth-overlay" class="h-screen">
    <div id="layout-auth-gradient" />

    <UMain
      :ui="{
        wrapper: 'flex items-center justify-center',
      }"
    >
      <div class="w-full max-w-sm">
        <slot />
      </div>
    </UMain>
  </div>
</template>

<style scoped>
  #layout-auth-gradient {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgb(var(--color-primary-500) / 0.25) 0,
      #fff 100%
    );
  }

  .dark {
    #layout-auth-gradient {
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgb(var(--color-primary-400) / 0.1) 0,
        rgb(var(--color-gray-950)) 100%
      );
    }
  }

  #layout-auth-overlay {
    background-size: 100px 100px;
    background-image: linear-gradient(to right, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px),
      linear-gradient(to bottom, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px);
  }
  .dark {
    #layout-auth-overlay {
      background-image: linear-gradient(
          to right,
          rgb(var(--color-gray-900)) 0.5px,
          transparent 0.5px
        ),
        linear-gradient(to bottom, rgb(var(--color-gray-900)) 0.5px, transparent 0.5px);
    }
  }
</style>
