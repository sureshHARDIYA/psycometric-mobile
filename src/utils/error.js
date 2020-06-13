export const selectErrorMessage = (error) => {
  if (
    error &&
    error.graphQLErrors &&
    error.graphQLErrors.length &&
    error.graphQLErrors[0].message
  ) {
    return error.graphQLErrors[0].message;
  }

  if (
    error &&
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors &&
    error.networkError.result.errors.length &&
    error.networkError.result.errors[0].message
  ) {
    return error.networkError.result.errors[0].message;
  }

  return error ? error.message : '';
};

export const selectErrorCode = (error) => {
  if (error && error.networkError) {
    if (
      error.networkError.result &&
      error.networkError.result.errors &&
      error.networkError.result.errors.length &&
      error.networkError.result.errors[0].code
    ) {
      return Number(error.networkError.result.errors[0].code);
    }

    if (error.networkError.statusCode) {
      return Number(error.networkError.statusCode);
    }
  }

  if (error && error.graphQLErrors && error.graphQLErrors.length) {
    return 400;
  }

  return 500;
};
