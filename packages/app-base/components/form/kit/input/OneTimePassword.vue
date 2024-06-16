<script setup>
  // see https://formkit.com/guides/create-a-custom-input#create-a-custom-input
  const props = defineProps({
    context: Object,
  });

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
  <div class="flex space-x-2 w-full justify-between">
    <input
      v-for="index in digits"
      type="number"
      min="0"
      max="9"
      maxlength="1"
      :value="tmp[index - 1] || ''"
      @input="handleInput(index - 1, $event)"
      @focus="handleFocus"
      @paste="handlePaste"
      class="text-base text-center w-10 flex items-center py-2 px-3 rounded border border-gray-400 bg-white focus-within:ring-1 focus-within:!ring-primary-500 focus-within:!border-primary-500 group-data-[invalid]:border-red-500 group-data-[invalid]:ring-1 group-data-[invalid]:ring-red-500 group-data-[disabled]:bg-gray-100 group-data-[disabled]:!cursor-not-allowed shadow group-[]/repeater:shadow-none group-[]/multistep:shadow-none dark:bg-transparent dark:border-gray-500 dark:group-data-[disabled]:bg-gray-800/5 dark:group-data-[invalid]:border-red-500 dark:group-data-[invalid]:ring-red-500 formkit-inner"
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
