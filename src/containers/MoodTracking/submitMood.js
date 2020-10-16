import { useMutation } from '@apollo/react-hooks';

import { RECORD_MUTATION } from './mutation';

export const submitMood = () => {
  let submiting = false;
  const [submit, { loading, error }] = useMutation(RECORD_MUTATION);

  const onSubmit = async (form) => {
    if (!submiting) {
      try {
        submiting = true;
        await submit({ variables: { data: form } }).then((data) => {
          return data;
        });
      } catch (e) {
        throw e;
      } finally {
        submiting = false;
      }
    }
  };

  return {
    loading,
    onSubmit,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  };
};
