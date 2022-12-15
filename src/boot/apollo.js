import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import fetch from 'isomorphic-fetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { LocalStorage } from 'quasar';
import router from '../router';
import { app } from '../main';
import { refreshToken } from '../graphql/auth/index';

// Config URL to call API
const uri = import.meta.env.VITE_API_URL_GRAPHQL;

// Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let _refreshToken = null;
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      if (error.includes('Unauthorized')) {
        const apollo =
          app.config.globalProperties.$apolloProvider.defaultClient
            .defaultClient;
        const auth = LocalStorage.getItem('auth');
        if (auth) {
          _refreshToken = auth.refreshToken;
        }
        apollo
          .query({
            query: refreshToken,
            variables: {
              refreshToken: _refreshToken,
            },
          })
          .then((res) => {
            const { statusCode, data, error } = res?.data?.refreshToken;
            if (statusCode !== 200) {
              if (error.errorCode == 'TOKEN_EXPIRED') {
                return router.push({ name: 'Login' });
              }
            }
            LocalStorage.set('auth', {
              ...auth,
              accessToken: data?.accessToken,
            });
          })
          .catch(({ error: graphQLErrors }) => {
            if (error) {
              router.push({ name: 'Login' });
            }
          });
      }
    });
  }
  if (networkError) {
    const $q = app.config.globalProperties.$q;
    $q.notify({
      type: 'negative',
      position: 'top',
      classes: 'q-mt-lg',
      message: 'Internal server error!',
    });
  }
});

// Create HTTP Link
const httpLink = createHttpLink({
  uri: uri,
  fetch,
});

const headerLink = setContext((request, previousContext) => {
  let token = '';
  let tokenType = '';
  const auth = LocalStorage.getItem('auth');
  if (auth) {
    token = auth.accessToken;
    tokenType = auth.tokenType;
  }

  return {
    headers: {
      // Make sure you include any existing headers!
      ...previousContext.headers,
      Authorization: `${tokenType} ${token}`,
    },
  };
});

const link = new ApolloLink.from([errorLink, headerLink, httpLink]);

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

// export default ({ app, Vue }) => {
//   Vue.use(VueApollo);
//   app.apolloProvider = apolloProvider;
// };
