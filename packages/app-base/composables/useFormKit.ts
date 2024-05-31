import type { FormKitNode } from '@formkit/core';

export default function () {
  const passwordToggle = (node: FormKitNode) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
    node.props.type = node.props.type === 'password' ? 'text' : 'password';
  };

  return {
    passwordToggle,
  };
}
