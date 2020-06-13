import { useMutation } from "@apollo/react-hooks";
import { QUESTIONNAIRE_FAROURITE } from "./mutation";
import { useCallback } from "react";

export const useFavourite = () => {
  const [submit, { loading, error }] = useMutation(QUESTIONNAIRE_FAROURITE)

  const onFavourte = useCallback((id) => {
    submit({
      variables: { id }
    })
  }, [])

  return {
    loading,
    onFavourte,
    error: error ? selectErrorMessage(error) : null,
  }
}