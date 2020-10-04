import React, { useMemo } from 'react';
import {Alert} from 'react-native';
import { submitMood } from './submitMood';
import { ConfirmationBubble as SubmitComponent } from '../../components/moodtrackingapp/confirmationBubble';
import { Calendar as QueryComponent } from '../../components/moodtrackingapp/calendar';
import { useSearch } from './useSearch';
import { QuestionList as List } from '../../components';

export const ConfirmationBubble = (props, {
                       moods: _moods = [],
                       id,
                     }) => {

  // To submit moods
  const { onSubmit, loading } = submitMood();

  const moods = useMemo(() =>  _moods.map((mood) => {
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
}

export const Calendar  = ({ search = true, ...props }) =>{
  // To retrieve a list of tracked emotions
  const { list, loading, onRefresh } = useSearch();
  return (
      <QueryComponent  {...props} data={list} loading={loading} onRefresh={onRefresh} />
  );
}
