import React from 'react';

import { SelectedDateDialog as DestroyComponent } from '../../components/moodtrackingapp/selectedDateDialog';
import { destroyMood } from './destroyMood';
import { useSearch } from './useSearch';

export const EmotionQuery = ({ search = true }) => {
  // To retrieve a list of tracked emotions
  return useSearch();
};

export const SelectedDateDialog = ({ ...props }) => {
  // To delete moods
  const { onDestroy, loading, onRefresh } = destroyMood();
  return (
    <DestroyComponent
      {...props}
      loading={loading}
      onRefresh={onRefresh}
      onDestroy={onDestroy}
    />
  );
};
