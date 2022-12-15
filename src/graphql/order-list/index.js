import gql from 'graphql-tag';

export const queryGetList = gql`
  query getOrderList($page: Int, $pageSize: Int) {
    getOrderList(page: $page, pageSize: $pageSize) {
      data {
        items {
          no
          month
          year
          orderDetail {
            day
            isActive
            month
          }
        }
        pagination {
          totalCount
          pageTotal
          currentPage
          pageSize
        }
      }
      message
      statusCode
      error {
        errorCode
        message
      }
    }
  }
`;
