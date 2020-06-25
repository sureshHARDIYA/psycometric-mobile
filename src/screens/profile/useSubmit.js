import { useMutation } from "@apollo/react-hooks";
import { AUTH_UPDATE_PROFILE } from "./mutation";
import _get from 'lodash/get';
import { Toast } from '@ant-design/react-native'

export const useSubmit = () => {
  const [submit, { loading, error }] = useMutation(AUTH_UPDATE_PROFILE);

  const onSubmit = async (form) => {
    try {
      const profile = {
        lastName: form.lastName,
        firstName: form.firstName,
        notification: form.notification,
      };

      await submit({
        variables: { profile },
        refetchQueries: ['AUTH_ME']
      });

      Toast.success('Update user successfully')
    } catch (e) {
      console.log('E:', e, e.toString())
    }
  }

  return {
    onSubmit,
    loading,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
