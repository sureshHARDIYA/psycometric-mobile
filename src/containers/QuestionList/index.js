import React from 'react';
import { useSearch } from './useSearch';
import { QuestionList as List } from '../../components';

export const QuestionList = props => {
  const { list, loading, onRefresh, handleLoadMore, current } = useSearch();

  return (
    <List {...props} data={list} loading={loading} onRefresh={onRefresh} handleLoadMore={() => handleLoadMore(current + 1)}/>
  )
}
