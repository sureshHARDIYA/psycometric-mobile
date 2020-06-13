import { useMutation } from "@apollo/react-hooks";
import { AUTH_SIGN_UP } from "./mutation";
import _get from 'lodash/get';
import { useAuth } from "../../containers/Auth";

export const useRegister = () => {
  const { setToken } = useAuth();
  const [register, { loading, error }] = useMutation(AUTH_SIGN_UP);

  const onRegister = async (form) => {
    try {
      const { data } = await register({ variables: form });
      setToken(data.result);
    } catch (e) {
      console.log('E:', e, e.toString())
    }
  }

  return {
    onRegister,
    loading,
    error: error ? (Array.isArray(error) ? error : [error]).join(', ') : null,
  }
};
