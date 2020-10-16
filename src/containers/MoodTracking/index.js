import React from 'react';

import { ConfirmationBubble as SubmitComponent } from '../../components/moodtrackingapp/confirmationBubble';
import { submitMood } from './submitMood';

export const ConfirmationBubble = (props, { moods: _moods = [], id }) => {
  // To submit moods
  const { onSubmit } = submitMood();

  return <SubmitComponent {...props} onSubmit={onSubmit} />;
};
