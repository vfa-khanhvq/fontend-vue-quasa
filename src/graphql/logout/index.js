import gql from 'graphql-tag';
export const logout = gql`
query logout{
  logout{
    statusCode
    message
    data {
      userId
    }
    error {
      errorCode
      message
      details {
        message
        type
        key
        value
      }
    }
  }
}
`;
