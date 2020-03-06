/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.exec('npm run reseed:testdb')
  })

  it('Sccuessfully logs in', () => {
    cy.visit('/login')

    cy.login('jin@mail.com', 'Red1234!')

    cy.location('pathname').should('eq', '/')

    cy.get('[data-testid=contact-form]').should('be.visible')

    cy.window()
      .then(window => window.localStorage.getItem('token'))
      .should('not.be.null')
  })
})
