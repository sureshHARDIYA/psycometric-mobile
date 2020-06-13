import { useMutation } from "@apollo/react-hooks";
import { FEEDBACK_CREATE } from "./mutation";
import _get from 'lodash/get';
import { selectErrorMessage } from "../../utils/error";
import { useState } from "react";

export const useSubmit = (reset) => {
  const [notice, setNotice] = useState({});
  const [submit, { loading, error }] = useMutation(FEEDBACK_CREATE);

  const onSubmit = async (data) => {
    try {
      await submit({ variables: { data } });
      setNotice({
        type: 'success',
        message: 'Sent feedback success'
      });
      reset();
    } catch (e) {
      setNotice({
        type: 'danger',
        message: selectErrorMessage(error)
      });
    }
  }

  return {
    loading,
    onSubmit,
    notice,
  }
};
