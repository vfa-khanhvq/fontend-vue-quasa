import gql from 'graphql-tag';

export const queryResultList = gql`
  query getOrdersByDate($input: IntputGetOrderByDate!) {
    getOrdersByDate(input: $input) {
      data {
        step
        items {
          id
          creditReservesId
          branchCode
          accountCode
          brandCode
          orderAmount
          accountType
          orderDate
          ycustomerResult
          branchlockResult
          moneyShortageResult
          nisaResult
          nameMatchingResult
          authSalesResult
          snrfileFundsId
          snrfileDepositsId
          invalidCardCheckResult
        }
      }
      error {
        errorCode
        message
        details {
          key
          type
          value
          message
        }
      }
      statusCode
    }
  }
`;
