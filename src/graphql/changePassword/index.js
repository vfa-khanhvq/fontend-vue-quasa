import gql from 'graphql-tag';
export const changePassword = gql`
  mutation changePassword($password: String!, $newPassword: String!) {
    changePassword(
      changePassword: { password: $password, newPassword: $newPassword }
    ) {
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
          key
          type
          value
        }
      }
    }
  }
`;
