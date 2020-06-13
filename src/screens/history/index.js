import React, { useState } from 'react';
import { useSearch } from './useSearch';
import { HistoryList as List } from '../../components';
import { Header, Container } from '../../themes';
import { SegmentedControl } from '@ant-design/react-native';
import { Color } from '../../constants';

const HistoryTest = () => {
  const { list, max, loading, onRefresh, handleLoadMore } = useSearch('TEST');
  return <List list={list} max={max} loading={loading} onRefresh={onRefresh} handleLoadMore={handleLoadMore} />
}

const HistoryPractice = () => {
  const { list, max, loading, onRefresh, handleLoadMore } = useSearch('PRACTICE');
  return <List list={list} max={max} loading={loading} onRefresh={onRefresh} handleLoadMore={handleLoadMore} />
}

export const History = ({ navigation }) => {
  const [tab, setTab] = useState(0);

  return (
    <Container backgroundColor={Color.background}>
      <Header>
        <Header.Back navigation={navigation} />
        <Header.Title>History</Header.Title>
      </Header>
      <SegmentedControl
        tintColor="red"
        style={{ height: 40, width: 280, alignSelf: 'center', margin: 20 }}
        values={['Practice', 'Test']}
        onValueChange={(i) => setTab(i)}
      />
      {tab === 'Test' ? <HistoryTest /> : <HistoryPractice />}
    </Container>
  )
}
