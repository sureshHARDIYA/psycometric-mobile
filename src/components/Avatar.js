import React from 'react';
import { Gravatar } from 'react-native-gravatar';

import { Color } from '../constants';

export const Avatar = ({ email }) => (
  <Gravatar
    options={{
      email,
      parameters: { size: '200', d: 'mm' },
      secure: true,
    }}
    style={{
      width: 50,
      height: 50,
      borderRadius: 50,
      marginBottom: 10,
      backgroundColor: Color.gray,
    }}
  />
);
