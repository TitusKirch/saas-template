import type { FormKitNode } from '@formkit/core';

export default function () {
  const passwordToggle = (node: FormKitNode) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
    node.props.type = node.props.type === 'password' ? 'text' : 'password';
  };

  const setErrors = <T>({ node, error }: { node: FormKitNode; error?: ApiErrorResponse<T> }) => {
    const errorMessages: Record<string, string> = {};
    if (!error) {
      return false;
    }
    if (error.errors) {
      for (const key in error.errors) {
        errorMessages[key] = error.errors[key][0];
      }

      node.setErrors([], errorMessages);
      return errorMessages;
    } else if (error.message) {
      errorMessages.form = error.message;
      node.setErrors([], errorMessages);
      return errorMessages;
    }

    return false;
  };

  return {
    passwordToggle,
    setErrors,
  };
}
