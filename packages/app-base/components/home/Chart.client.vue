<script setup lang="ts">
  import { eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, format } from 'date-fns';
  import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue';
  import { useElementSize } from '@vueuse/core';

  const cardRef = ref<HTMLElement | null>(null);

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    period: {
      type: String as PropType<Period>,
      required: true,
    },
    range: {
      type: Object as PropType<Range>,
      required: true,
    },
  });

  type DataRecord = {
    date: Date;
    amount: number;
  };

  const { width } = useElementSize(cardRef);

  // We use `useAsyncData` here to have same random data on the client and server
  const data = computed<DataRecord[]>(() => {
    const dates = {
      daily: eachDayOfInterval,
      weekly: eachWeekOfInterval,
      monthly: eachMonthOfInterval,
    }[props.period](props.range);

    const min = 0.1;
    const max = Math.random() * 10;

    return dates.map((date) => ({
      date,
      amount: Math.random() * (max - min) + min,
    }));
  });

  const x = (_: DataRecord, i: number) => i;
  const y = (d: DataRecord) => d.amount;

  const formatNumber = new Intl.NumberFormat('de', {
    maximumFractionDigits: 2,
  }).format;

  const formatDate = (date: Date): string => {
    return {
      daily: format(date, 'd MMM'),
      weekly: format(date, 'd MMM'),
      monthly: format(date, 'MMM yyy'),
    }[props.period];
  };

  const xTicks = (i: number) => {
    if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
      return '';
    }

    return formatDate(data.value[i].date);
  };

  const template = (d: DataRecord) => `${formatDate(d.date)}: ${formatNumber(d.amount)}`;
</script>

<template>
  <UDashboardCard ref="cardRef" :ui="{ body: { padding: '!pb-3 !px-0' } as any }">
    <template #header>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{{ title }}</p>
      </div>
    </template>

    <VisXYContainer :data="data" :padding="{ top: 10 }" class="h-96" :width="width">
      <VisLine :x="x" :y="y" color="rgb(var(--color-primary-DEFAULT))" />
      <VisArea :x="x" :y="y" color="rgb(var(--color-primary-DEFAULT))" :opacity="0.1" />

      <VisAxis type="x" :x="x" :tick-format="xTicks" />

      <VisCrosshair color="rgb(var(--color-primary-DEFAULT))" :template="template" />

      <VisTooltip />
    </VisXYContainer>
  </UDashboardCard>
</template>

<style scoped>
  .unovis-xy-container {
    --vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
    --vis-crosshair-circle-stroke-color: #fff;

    --vis-axis-grid-color: rgb(var(--color-gray-200));
    --vis-axis-tick-color: rgb(var(--color-gray-200));
    --vis-axis-tick-label-color: rgb(var(--color-gray-400));

    --vis-tooltip-background-color: #fff;
    --vis-tooltip-border-color: rgb(var(--color-gray-200));
    --vis-tooltip-text-color: rgb(var(--color-gray-900));
  }

  .dark {
    .unovis-xy-container {
      --vis-crosshair-line-stroke-color: rgb(var(--color-primary-400));
      --vis-crosshair-circle-stroke-color: rgb(var(--color-gray-900));

      --vis-axis-grid-color: rgb(var(--color-gray-800));
      --vis-axis-tick-color: rgb(var(--color-gray-800));
      --vis-axis-tick-label-color: rgb(var(--color-gray-500));

      --vis-tooltip-background-color: rgb(var(--color-gray-900));
      --vis-tooltip-border-color: rgb(var(--color-gray-800));
      --vis-tooltip-text-color: #fff;
    }
  }
</style>
