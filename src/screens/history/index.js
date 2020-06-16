import React from 'react';
import { useSearch } from './useSearch';
import { HistoryList as List } from '../../components';
import { Header, Container } from '../../themes';
import { Color } from '../../constants';

export const History = ({ navigation }) => {
  const { list, max, loading, onRefresh, handleLoadMore } = useSearch('TEST');

  return (
    <Container backgroundColor={Color.background}>
      <Header>
        <Header.Back navigation={navigation} />
        <Header.Title>History</Header.Title>
      </Header>
      <List list={list} max={max} loading={loading} onRefresh={onRefresh} handleLoadMore={handleLoadMore} />
    </Container>
  )
}
