<script setup lang="ts">
  import type { FormKitContext } from '@formkit/core';

  // see https://formkit.com/guides/create-a-custom-input#create-a-custom-input
  const props = defineProps<{
    context: FormKitContext;
  }>();

  const digits = Number(props.context?.digits) || 6;
  const tmp = ref(props.context.value || '');

  // handle input, advancing or retreating focus.
  const handleInput = (index, e) => {
    const prev = tmp.value;

    if (tmp.value.length <= index) {
      // if this is a new digit
      tmp.value = '' + tmp.value + e.target.value;
    } else {
      // if this digit is in the middle somewhere, cut the string into two
      // pieces at the index, and insert our new digit in.
      tmp.value = '' + tmp.value.substr(0, index) + e.target.value + tmp.value.substr(index + 1);
    }

    // get all the digit inputs
    const inputs = e.target.parentElement.querySelectorAll('input');

    if (index < digits - 1 && tmp.value.length >= prev.length) {
      // if this is a new input and not at the end, focus the next input
      inputs.item(index + 1).focus();
    } else if (index > 0 && tmp.value.length < prev.length) {
      // in this case we deleted a value, focus backwards
      inputs.item(index - 1).focus();
    }

    if (tmp.value.length === digits) {
      // if our input is complete, commit the value.
      props.context.node.input(tmp.value);
    } else if (tmp.value.length < digits && props.context.value !== '') {
      // if our input is incomplete, it should have no value.
      props.context.node.input('');
    }
  };

  // on focus, select the text in our input.
  function handleFocus(e) {
    e.target.select();
  }

  // handle the paste event.
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (typeof paste === 'string') {
      // if it is the right length, paste it using slice instead of substr.
      tmp.value = paste.slice(0, digits);
      const inputs = e.target.parentElement.querySelectorAll('input');
      // focus on the last character
      inputs.item(tmp.value.length - 1).focus();

      if (tmp.value.length === digits) {
        props.context.node.input(tmp.value);
      }
    }
  };
</script>

<template>
  <div class="flex w-full justify-between space-x-2">
    <input
      v-for="index in digits"
      :key="index"
      type="number"
      min="0"
      max="9"
      maxlength="1"
      :value="tmp[index - 1] || ''"
      class="focus-within:!ring-primary-500 focus-within:!border-primary-500 formkit-inner flex w-10 items-center rounded border border-gray-400 bg-white px-3 py-2 text-center text-base shadow focus-within:ring-1 group-[]/multistep:shadow-none group-[]/repeater:shadow-none group-data-[disabled]:!cursor-not-allowed group-data-[invalid]:border-red-500 group-data-[disabled]:bg-gray-100 group-data-[invalid]:ring-1 group-data-[invalid]:ring-red-500 dark:border-gray-500 dark:bg-transparent dark:group-data-[invalid]:border-red-500 dark:group-data-[disabled]:bg-gray-800/5 dark:group-data-[invalid]:ring-red-500"
      @input="handleInput(index - 1, $event)"
      @focus="handleFocus"
      @paste="handlePaste"
    />
  </div>
</template>

<style scoped>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
