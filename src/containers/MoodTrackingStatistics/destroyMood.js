import _get from 'lodash/get';
import _set from 'lodash/fp/set';
import { useMutation } from '@apollo/react-hooks';
import { DESTROY_MUTATION } from './mutation';

export const destroyMood = () => {
  let emotionDestroy = false;
  const [destroy, { loading, error }] = useMutation(DESTROY_MUTATION);

  const onDestroy = async (ids) => {
    if (!emotionDestroy) {
      try {
        emotionDestroy = true;
        const { data } = await destroy({ variables: { ids } });
        setTimeout(() => {
          emotionDestroy = false;
        }, 5000);
        return data;
      } catch (e) {
        throw e;
      } finally {
        emotionDestroy = false;
      }
    }
  };

  return {
    loading,
    onDestroy,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  };
};
