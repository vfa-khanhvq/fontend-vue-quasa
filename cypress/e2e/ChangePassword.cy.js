import { aliasQuery, aliasMutation } from '../utils/GraphQLTestUtils.js'
import { t } from '../../src/i18n';
import { LocalStorage } from 'quasar';
import { ref } from 'vue';

const email = 'k2@gmail.com'
const oldPw = ref('Khanh2109@@@')
const oldPwChange = 'Khanh2109@'
const newPassword = ref('Khanh2109@')
const newPasswordChange = 'Khanh2109@@@'

describe('Change Password', { defaultCommandTimeout: 10000 },  () => {
  beforeEach(() => {
    cy.intercept("POST", Cypress.env("base_API"), (req) => {
      aliasQuery(req, "login");
    });
    cy.visit(Cypress.env('base_Url') + '/Login')
    cy.get('.test__email').type('{selectAll}{backspace}' + email)
    cy.get('.test__password').type('{selectAll}{backspace}' + oldPw.value)
    cy.get('.q-checkbox__bg').click()
    cy.get('.test__login').click()
  })
  it('TC_1: change success and relogin success', () => {
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        oldPw.value = oldPwChange
        newPassword.value = newPasswordChange
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + oldPw.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type(oldPw.value)
          cy.contains(t('changePassword.newPw')).type(newPassword.value)
          cy.contains(t('changePassword.reNewPw')).type(newPassword.value)
          cy.get('.q-btn').click()
          cy.get('.q-notification').should('contain', t('changePassword.success'))
          cy.get('.test__email').type('{selectAll}{backspace}' + email)
          cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
          cy.get('.test__login').click()
          cy.get('.q-notification').should('contain', t('login.message.success'))
          cy.location("pathname").should("eq", "/");
        })
      }
      else {
        cy.visit(Cypress.env('base_Url') + '/change-pw')
        cy.contains(t('changePassword.oldPw')).type(oldPw.value)
        cy.contains(t('changePassword.newPw')).type(newPassword.value)
        cy.contains(t('changePassword.reNewPw')).type(newPassword.value)
        cy.get('.q-btn').click()
        cy.get('.q-notification').should('contain', t('changePassword.success'))
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.get('.q-notification').should('contain', t('login.message.success'))
        cy.location("pathname").should("eq", "/");
      }
    })
  })

  it('TC_2: Wrong Old Pass Should Fail', () => {
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.contains(t('changePassword.newPw')).type(newPassword.value)
          cy.contains(t('changePassword.reNewPw')).type(newPassword.value)
          cy.get('.q-btn').click()
          cy.get('.q-notification').should('contain', t('changePassword.error.errorCode.WRONG_PASSWORD'))
        })
      }
      else {
        cy.visit(Cypress.env('base_Url') + '/change-pw')
        cy.contains(t('changePassword.oldPw')).type('asdasd')
        cy.contains(t('changePassword.newPw')).type(newPassword.value)
        cy.contains(t('changePassword.reNewPw')).type(newPassword.value)
        cy.get('.q-btn').click()
        cy.get('.q-notification').should('contain', t('changePassword.error.errorCode.WRONG_PASSWORD'))
      }
    })
  })

  it('TC_3: Wrong Password format should show error', () => {
    const wrong = 'asd'
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.contains(t('changePassword.newPw')).type(wrong)
          cy.contains(t('changePassword.reNewPw')).type(wrong)
          cy.contains(t('changePassword.newPw')).should('contain', t('changePassword.notEnoughCondition'))
        })
      }
      else {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.contains(t('changePassword.newPw')).type(wrong)
          cy.contains(t('changePassword.reNewPw')).type(wrong)
          cy.contains(t('changePassword.newPw')).should('contain', t('changePassword.notEnoughCondition'))
      }
    })
  })

  it('TC_4: password not match should show error', () => {
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.contains(t('changePassword.newPw')).type(newPassword.value)
          cy.contains(t('changePassword.reNewPw')).type('asd')
          cy.contains(t('changePassword.reNewPw')).should('contain', t('changePassword.notMatch'))
        })
      }
      else {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.contains(t('changePassword.newPw')).type(wrong)
          cy.contains(t('changePassword.reNewPw')).type(wrong)
          cy.contains(t('changePassword.reNewPw')).should('contain', t('changePassword.notMatch'))
      }
    })
  })

  it('TC_5: new password should not match old password, should show error', () => {
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type(newPassword.value)
          cy.contains(t('changePassword.newPw')).type(newPassword.value)
          cy.contains(t('changePassword.reNewPw')).type(newPassword.value)
          cy.contains(t('changePassword.newPw')).should('contain', t('changePassword.doNotMatch'))
        })
      }
      else {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.contains(t('changePassword.newPw')).type(wrong)
          cy.contains(t('changePassword.reNewPw')).type(wrong)
          cy.contains(t('changePassword.newPw')).should('contain', t('changePassword.doNotMatch'))
      }
    })
  })

  it('TC_6: not enter anything, btn should disable', () => {
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.get('.q-btn').should('be.disabled')
        })
      }
      else {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.get('.q-btn').should('be.disabled')
      }
    })
  })

  it('TC_7: not enter enough, btn should disable', () => {
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.get('.q-btn').should('be.disabled')
        })
      }
      else {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.contains(t('changePassword.oldPw')).type('asdasd')
          cy.get('.q-btn').should('be.disabled')
      }
    })
  })

  it('TC_8: Title must corrent', () => {
    cy.wait('@gqlLoginQuery').then((res) => {
      if (res.response.body.data.login?.error?.errorCode === 'WRONG_PASSWORD') {
        cy.get('.test__email').type('{selectAll}{backspace}' + email)
        cy.get('.test__password').type('{selectAll}{backspace}' + newPassword.value)
        cy.get('.test__login').click()
        cy.wait('@gqlLoginQuery').then(() => {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.get('h5').should('contain', t('changePassword.title'))
        })
      }
      else {
          cy.visit(Cypress.env('base_Url') + '/change-pw')
          cy.get('h5').should('contain', t('changePassword.title'))
      }
    })
  })
})
