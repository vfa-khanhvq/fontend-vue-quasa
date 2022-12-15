import { aliasQuery, hasOperationName } from '../utils/GraphQLTestUtils';
import { t } from '../../src/i18n';

const stubLogin = {
  data: {
    login: {
      statusCode: 200,
      data: {
        accessToken: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtAZ21haWwuY29tIiwidXNlcklkIjoxLCJpYXQiOjE2NjU3MTc3OTIsImV4cCI6MTY2NjA3Nzc5Mn0.jY96CSqumD1o8WD2S2MzuyR3V8vQZXKJGfRx6XjPgJY',
          expiredAt: 1666077792,
          __typename: 'AccessToken',
        },
        refreshToken: {
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtAZ21haWwuY29tIiwidXNlcklkIjoxLCJpYXQiOjE2NjU3MTc3OTIsImV4cCI6MTY2NTgyNTc5Mn0.d1VWXwKBzff21_VmAVtY9Bt6i6iRy_k9hCqXM-psbws',
          expiredAt: 1665825792,
          __typename: 'RefreshToken',
        },
        tokenType: 'bearer',
        __typename: 'Login',
      },
      error: null,
      __typename: 'LoginResponse',
    },
  },
};

const stubOrderList = {
  data: {
    getOrderList: {
      data: {
        items: [
          {
            no: 1,
            month: 9,
            year: 2022,
            orderDetail: [
              {
                day: 10,
                isActive: true,
                month: 9,
                __typename: 'OrderDetail',
              },
              {
                day: 11,
                isActive: true,
                month: 9,
                __typename: 'OrderDetail',
              },
            ],
            __typename: 'Orders',
          },
          {
            no: 2,
            month: 8,
            year: 2022,
            orderDetail: [
              {
                day: 10,
                isActive: false,
                month: 9,
                __typename: 'OrderDetail',
              },
              {
                day: 11,
                isActive: false,
                month: 9,
                __typename: 'OrderDetail',
              },
            ],
            __typename: 'Orders',
          },
          {
            no: 3,
            month: 7,
            year: 2022,
            orderDetail: [
              {
                day: 10,
                isActive: false,
                month: 9,
                __typename: 'OrderDetail',
              },
              {
                day: 11,
                isActive: false,
                month: 9,
                __typename: 'OrderDetail',
              },
            ],
            __typename: 'Orders',
          },
          {
            no: 1,
            month: 6,
            year: 2022,
            orderDetail: [
              {
                day: 10,
                isActive: false,
                month: 9,
                __typename: 'OrderDetail',
              },
              {
                day: 11,
                isActive: false,
                month: 9,
                __typename: 'OrderDetail',
              },
            ],
            __typename: 'Orders',
          },
        ],
        pagination: {
          totalCount: 2,
          pageTotal: 1,
          currentPage: 1,
          pageSize: 10,
          __typename: 'PagerInformation',
        },
        __typename: 'OrdersRespone',
      },
      message: 'Success',
      statusCode: 200,
      error: null,
      __typename: 'GetOrderListResponse',
    },
  },
};
describe('Order list', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.intercept('POST', Cypress.env('base_API'), (req) => {
      if (hasOperationName(req, 'getOrderList')) {
        req.alias = 'gqlGetOrderListQuery';
        req.reply(stubOrderList);
      }
      if (hasOperationName(req, 'login')) {
        req.alias = 'gqlLoginQuery';
        req.reply(stubLogin);
      }
    });
    cy.visit(Cypress.env('base_Url'));
    cy.get('.q-card__actions > .q-btn > .q-btn__content').click();
    cy.get('.test__email').type('k@gmail.com');
    cy.get('.test__password').type('password');
    cy.get('.q-checkbox__bg').click();
    cy.get('.test__login').click();
  });
  it('TC 1: Test have all order list and display correct', () => {
    cy.get('.order-list-title').should('have.text', t('orderList.title'));
    cy.get('.q-table > thead > .table__header-id').should(
      'have.text',
      t('orderList.headers.ID')
    );
    cy.get('.q-table > thead > .table__header-month').should(
      'have.text',
      t('orderList.headers.month/Year')
    );
    cy.get('.q-table > thead > .table__header-order-date').should(
      'have.text',
      t('orderList.headers.orderDate')
    );
    cy.get('.q-table > thead > .table__header-status').should(
      'have.text',
      t('orderList.headers.status')
    );
    cy.get('.q-table > thead > .table__header-action').should(
      'have.text',
      t('orderList.headers.action')
    );
    // This month title
    cy.get('.order-list__table > :nth-child(2)').should(
      'have.text',
      t('orderList.thisMonthOrder')
    );
    // Previous months title
    cy.get('.order-list__table > :nth-child(4)').should(
      'have.text',
      t('orderList.lastMonthOrder')
    );

    cy.get(
      ':nth-child(3) > .q-expansion-item > .q-expansion-item__container > .q-item > .q-item__section--main > table > thead > .table__header-id'
    ).should('have.text', 1);
    cy.get(
      ':nth-child(3) > .q-expansion-item > .q-expansion-item__container > .q-item > .q-item__section--main > table > thead > .table__header-monthly'
    ).should('have.text', 'Sep/2022');
    cy.get(
      ':nth-child(3) > .q-expansion-item > .q-expansion-item__container > .q-item > .q-item__section--side > .q-icon'
    ).click();

    cy.get(
      ':nth-child(5) > .q-expansion-item > .q-expansion-item__container > .q-item > .q-item__section--main > table > thead > .table__header-id'
    ).should('have.text', 2);
    cy.get(
      ':nth-child(5) > .q-expansion-item > .q-expansion-item__container > .q-item > .q-item__section--main > table > thead > .table__header-monthly'
    ).should('have.text', 'Aug/2022');

    cy.get(
      ':nth-child(3) .text-center > :nth-child(1) > .table__data-id'
    ).should('have.text', '1.0');
    cy.get(
      ':nth-child(3) .text-center > :nth-child(1) > .table__data-month'
    ).should('have.text', '09');
    cy.get(
      ':nth-child(3) .text-center > :nth-child(1) > .table__data-order-date'
    ).should('have.text', '10');
    cy.get(
      ':nth-child(3) .text-center > :nth-child(1) > .table__data-status'
    ).should('have.text', 'Active');
    cy.get(
      ':nth-child(3) .text-center > :nth-child(1) > .table__data-action'
    ).contains('Checkout');

    cy.get(
      ':nth-child(5) > .q-expansion-item > .q-expansion-item__container > .q-item > .q-item__section--side > .q-icon'
    ).click();
    cy.get(
      ':nth-child(5) .text-center > :nth-child(1) > .table__data-id'
    ).should('have.text', '2.0');
    cy.get(
      ':nth-child(5) .text-center > :nth-child(1) > .table__data-month'
    ).should('have.text', '09');
    cy.get(
      ':nth-child(5) .text-center > :nth-child(1) > .table__data-order-date'
    ).should('have.text', '10');
    cy.get(
      ':nth-child(5) .text-center > :nth-child(1) > .table__data-status'
    ).should('have.text', 'Inactive');
    cy.get(
      ':nth-child(5) .text-center > :nth-child(1) > .table__data-action'
    ).contains('Result');
  });
  it('TC 2: Test throw unauthorized', () => {
    cy.wait('@gqlLoginQuery').then(() => {
      cy.wait(1000);
      cy.clearLocalStorage();
      cy.visit(Cypress.env('base_Url'));
      cy.get('.q-dialog__title').should('have.text', t('titleNotLogin'));
    });
  });
  it('TC 10: Internal server error', () => {
    cy.intercept('POST', Cypress.env('base_API'), (req) => {
      if (hasOperationName(req, 'getOrderList')) {
        req.alias = 'serverError';
        req.reply({
          forceNetworkError: true,
        });
      }
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });
    });
    cy.wait('@gqlLoginQuery');
    cy.visit(Cypress.env('base_Url'));
    cy.get('.q-notification__message').should(
      'have.text',
      'Internal server error!'
    );
  });
});
