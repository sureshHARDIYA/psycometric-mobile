import React from 'react';
import { useSearch } from './useSearch';
/*import { CalendarStatistics as QueryComponent } from '../../components/moodtrackingapp/calendarStatistics';*/
import { destroyMood } from './destroyMood';
import { SelectedDateDialog as DestroyComponent } from '../../components/moodtrackingapp/selectedDateDialog';
import { ApolloProvider, Query } from "react-apollo";

export const EmotionQuery = ({ search = true }) => {
  // To retrieve a list of tracked emotions
  return useSearch();
};

export const SelectedDateDialog = ({ ...props }) => {
  // To delete moods
  const { onDestroy, loading, onRefresh } = destroyMood();
  return (
    <DestroyComponent  {...props} onDestroy={onDestroy} loading={loading} onRefresh={onRefresh} />
  );
};