import { aliasQuery, aliasMutation } from '../utils/GraphQLTestUtils.js'
import { t } from '../../src/i18n';
import { LocalStorage } from 'quasar';

describe('Login', () => {

  it('TC_1: login success and data must be correct api response', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.intercept("POST", Cypress.env("base_API"), (req) => {
      aliasQuery(req, "login");
    });
    cy.get('.test__email').type('k2@gmail.com')
    cy.get('.test__password').type('Khanh2109@@@')
    cy.get('.q-checkbox__bg').click()
    cy.get('.test__login').click()
    cy.wait('@gqlLoginQuery').then((res) => {
      const auth = LocalStorage.getItem('auth')
      const remember = JSON.parse(LocalStorage.getItem('login'))
      expect(remember.remember).to.eq(true)
      expect(remember.email).contain(res.request.body.variables.email)
      expect(remember.password).contain(res.request.body.variables.password)
      expect(res.response.body.data.login.data.accessToken.accessToken).contain(auth.accessToken)
      expect(res.response.body.data.login.data.refreshToken.refreshToken).contain(auth.refreshToken)
      expect(res.response.body.data.login.data.tokenType).contain(auth.tokenType)
    })
    cy.get('.q-notification').should('contain', t('login.message.success'))
    cy.location("pathname").should("eq", "/");
  })

  it('TC_2: Login when wrong email', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__email').type('k@gmail.com')
    cy.get('.test__password').type('Khanh2109@@')
    cy.get('.test__login').click()
    cy.get('.q-notification').should('contain', t('login.error.errorCode.INVALID_ACCOUNT'))
  })

  it('TC_3: Login when wrong pass', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__email').type('k2@gmail.com')
    cy.get('.test__password').type('Khanh2109')
    cy.get('.test__login').click()
    cy.get('.q-notification').should('contain', t('login.error.errorCode.WRONG_PASSWORD'))
  })

  it('TC_4: have password, dont have email, cant click login btn', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__password').type('aaaaaaaa')
    cy.get('.test__login').should('be.disabled')
  })

  it('TC_5: have password, wrong email format, cant click login btn', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__password').type('aaaaaaaa')
    cy.get('.test__email').type('aaaaa').should('contain', t('login.invalidEmail'))
    cy.get('.test__login').should('be.disabled')
  })

  it('TC_6: have email, dont have password, cant click login btn', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__email').type('k2@gmail.com')
    cy.get('.test__login').should('be.disabled')
  })

  it('TC_13: test when have no token, must redirect Login', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__email').type('k2@gmail.com')
    cy.get('.test__password').type('Khanh2109@@')
    cy.get('.test__login').click()
    cy.clearLocalStorage('auth')
    cy.clearLocalStorage('login')
    cy.reload()
    cy.location("pathname").should("eq", "/Login");
  })

  it('TC_14: test wrong email format', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__email').type('asd').should('contain', t('login.invalidEmail'))
  })

  it('TC_15: test empty email', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__email').type('a{backspace}').should('contain', t('login.notEmpty'))
  })

  it('TC_16: test empty password', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__password').type('a{backspace}').should('contain', t('login.notEmpty'))
  })

  it('TC_12: Press login button went not enter anything, cant click login btn', () => {
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__login').should('be.disabled')
  })
})
