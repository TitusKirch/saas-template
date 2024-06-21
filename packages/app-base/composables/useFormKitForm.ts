import type { FormKitNode } from '@formkit/core';
import type { AsyncDataRequestStatus } from '#app';

export default function <FormT extends Record<string, any>>({
  form,
  error,
  status,
  beforeExecuteCallback,
  executeCallback,
  successCallback,
  errorCallback,
}: {
  form: Ref<FormT>;
  status?: Ref<AsyncDataRequestStatus>;
  error?: Ref<{
    data: ApiErrorResponse<FormT>;
  } | null>;
  beforeExecuteCallback?: () => Promise<void>;
  executeCallback?: () => Promise<void>;
  successCallback?: () => Promise<any>;
  errorCallback?: () => Promise<void>;
}) {
  const errorMessages: Ref<Record<string, string>> = ref({});
  const submit = async (data: FormT, node: FormKitNode) => {
    if (beforeExecuteCallback) {
      await beforeExecuteCallback();
    }

    if (executeCallback) {
      console.log('executeCallback');
      await executeCallback();
    }

    if (error?.value?.data?.errors) {
      for (const key in error.value.data.errors) {
        errorMessages.value[key] = error.value.data.errors[key][0];
      }
      node.setErrors([], errorMessages.value);
      if (errorCallback) {
        await errorCallback();
      }
      return false;
    } else if (error?.value?.data?.message) {
      errorMessages.value = {
        form: error.value.data.message,
      };
      if (errorCallback) {
        await errorCallback();
      }
      return false;
    }

    if (status?.value === 'success') {
      if (successCallback) {
        return await successCallback();
      }
    }
  };

  watch(form, (newValue: FormT, oldValue: FormT) => {
    const updatedErrorMessages: typeof errorMessages.value = {};
    for (const key of Object.keys(newValue) as Array<keyof FormT>) {
      if (newValue[key] === oldValue[key] && typeof key === 'string' && errorMessages.value[key]) {
        updatedErrorMessages[key] = errorMessages.value[key];
      }
    }
    errorMessages.value = updatedErrorMessages;
  });

  return {
    errorMessages,
    submit,
  };
}
