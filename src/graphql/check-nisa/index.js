import gql from 'graphql-tag';

export const checkNisa = gql`
  mutation checkNisaWaku($orderDate: Date!) {
    checkNisaWaku(input: { orderDate: $orderDate }) {
      data {
        id
        creditReservesId
        branchCode
        accountCode
        brandCode
        orderAmount
        accountType
        orderDate
        ycustomerResult
        invalidCardCheckResult
        branchlockResult
        moneyShortageResult
        nisaResult
        nameMatchingResult
        authSalesResult
        snrfileFundsId
        snrfileDepositsId
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
