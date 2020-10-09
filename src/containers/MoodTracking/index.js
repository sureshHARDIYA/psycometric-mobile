import React, { useMemo } from 'react';
import { submitMood } from './submitMood';
import { useSearch } from './useSearch';
import { destroyMood } from './destroyMood';
import { ConfirmationBubble as SubmitComponent } from '../../components/moodtrackingapp/confirmationBubble';
import { CalendarStatistics as QueryComponent } from '../../components/moodtrackingapp/calendarStatistics';
import { SelectedDateDialog as DestroyComponent } from '../../components/moodtrackingapp/selectedDateDialog';


export const ConfirmationBubble = (props, {
  moods: _moods = [],
  id,
}) => {

  // To submit moods
  const { onSubmit, loading } = submitMood();

  const moods = useMemo(() => _moods.map((mood) => {
    return ({
        ...mood,
        id: mood.id,
        emotion: mood.emotion,
        degree: mood.degree,
      }
    );
  }), [_moods]);

  return (
    <SubmitComponent
      {...props}
      id={id}
      moods={moods}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};

export const CalendarStatistics = ({ search = true, ...props }) => {
  // To retrieve a list of tracked emotions
  const { list, loading, onRefresh } = useSearch();

  return (
    <QueryComponent  {...props} data={list} loading={loading} onRefresh={onRefresh} />
  );
};

export const SelectedDateDialog = ({...props}) => {
  // To delete moods
  const { onDestroy, loading, onRefresh } = destroyMood();
  return (
    <DestroyComponent  {...props} onDestroy={onDestroy} loading={loading} onRefresh={onRefresh} />
  );
};
