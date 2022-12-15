import { aliasQuery, aliasMutation } from '../utils/GraphQLTestUtils';
import { t } from '../../src/i18n';
import { LocalStorage } from 'quasar';

describe('Result', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.intercept('POST', Cypress.env('base_API'), (req) => {
      aliasQuery(req, 'login');
      aliasQuery(req, 'getOrdersByDate');
    });
    cy.visit(Cypress.env('base_Url') + '/login');
    cy.get('.test__email').type('test@gmail.com');
    cy.get('.test__password').type('Admin@123');
    cy.get('.test__login').click();
  });
  it('TC_1: navigate to check nisa waku', () => {
    cy.wait('@gqlLoginQuery').then(() => {
      cy.visit(Cypress.env('base_Url') + '/result?day=06&month=10&year=2022');
      cy.get('.title').should('contain', t('result.title'));
    });
  });
  it('TC_2: click next should call api', () => {
    cy.wait('@gqlLoginQuery');
    cy.visit(Cypress.env('base_Url') + '/result?day=06&month=10&year=2022');
    cy.wait('@gqlGetOrdersByDateQuery').then((res) => {
      const response = res.response.body.data.getOrdersByDate.data;
      for (let i = 0; i < response.length; i++) {
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(1)`
        ).should('have.text', response[i].creditReservesId);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(2)`
        ).should('have.text', response[i].branchCode);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(3)`
        ).should('have.text', response[i].accountCode);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(4)`
        ).should('have.text', response[i].brandCode);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(5)`
        ).should('have.text', response[i].orderAmount);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(6)`
        ).should('have.text', response[i].accountType);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(7)`
        ).should('have.text', response[i].invalidCardCheckResult);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(8)`
        ).should('have.text', response[i].branchlockResult);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(9)`
        ).should('have.text', response[i].ycustomerResult);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(10)`
        ).should('have.text', response[i].moneyShortageResult);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(11)`
        ).should('have.text', response[i].nisaResult);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(12)`
        ).should('have.text', response[i].nameMatchingResult);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(13)`
        ).should('have.text', response[i].authSalesResult);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(14)`
        ).should('have.text', response[i].snrfileFundsId);
        cy.get(
          `.q-virtual-scroll__content > :nth-child(${i + 1}) > :nth-child(15)`
        ).should('have.text', response[i].snrfileDepositsId);
      }
    });
  });
  it('TC_3: show error when wrong date format', () => {
    cy.wait('@gqlLoginQuery');
    cy.visit(Cypress.env('base_Url') + '/result?day=06&month=100&year=2022');
    cy.get('.q-notification').should(
      'contain',
      t('result.error.errorCode.INPUT_INVALID')
    );
  });
  it('TC_4: show no data when have no data', () => {
    cy.wait('@gqlLoginQuery');
    cy.visit(Cypress.env('base_Url') + '/result?day=06&month=10&year=2022');
    cy.get('.q-page-container > :nth-child(1) > .row').should(
      'contain',
      t('result.noData')
    );
  });
});
