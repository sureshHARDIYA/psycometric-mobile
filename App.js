import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from '@ant-design/react-native';

import Root from './src';
import { Auth } from './src/containers';
import { client } from './src/apollo-client';
import { YellowBox } from 'react-native';
import { NotificationProvider } from './src/components/NotificationProvider';

YellowBox.ignoreWarnings([
  'Require cycle',
  'Warning',
  'P',
])

export default function App(props) {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <NotificationProvider>
          <Auth>
            <Root {...props} />
          </Auth>
        </NotificationProvider>
      </Provider>
    </ApolloProvider>
  )
}
