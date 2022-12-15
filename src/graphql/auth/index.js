import gql from 'graphql-tag';

export const query = gql`
  query login($email: String!, $password: String!, $grantType: String!) {
    login(
      input: { email: $email, password: $password, grantType: $grantType }
    ) {
      statusCode
      data {
        accessToken {
          accessToken
          expiredAt
        }
        refreshToken {
          refreshToken
          expiredAt
        }
        tokenType
      }
      error {
        errorCode
        message
        details {
          message
          key
          type
          value
        }
      }
    }
  }
`;
export const refreshToken = gql`
  query refreshToken($refreshToken: String) {
    refreshToken(refreshToken: $refreshToken) {
      statusCode
      message
      data {
        accessToken
        expiredAt
      }
      error {
        errorCode
        message
        details {
          message
          key
          type
          value
        }
      }
    }
  }
`;
