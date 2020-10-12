import React, { useMemo } from 'react';
import { submitMood } from './submitMood';
import { ConfirmationBubble as SubmitComponent } from '../../components/moodtrackingapp/confirmationBubble';



export const ConfirmationBubble = (props, {
  moods: _moods = [],
  id,
}) => {

  // To submit moods
  const { onSubmit } = submitMood();

/*  const moods = useMemo(() => _moods.map((mood) => {
    return ({
        ...mood,
        id: mood.id,
        emotion: mood.emotion,
        degree: mood.degree,
      }
    );
  }), [_moods]);*/

  return (
    <SubmitComponent
      {...props}
      onSubmit={onSubmit}
    />
  );
};


