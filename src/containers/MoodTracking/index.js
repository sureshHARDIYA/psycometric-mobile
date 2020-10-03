import React, { useMemo } from 'react';
import { submitMood } from './submitMood';
import { ConfirmationBubble as Component } from '../../components/moodtrackingapp/confirmationBubble';

export const ConfirmationBubble = (props, {
                       moods: _moods = [],
                       id,
                     }) => {
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
    <Component
      {...props}
      id={id}
      submiting={loading}
      moods={moods}
      onSubmit={onSubmit}
    />
  );
}
