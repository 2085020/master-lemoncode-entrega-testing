describe('Login specs', () => {
  it('visit the login page and login fail', () => {
    //ARRANGE
    const user = "admin";
    const errorPassword = "test1";

    // ACT
    cy.visit('/');
    cy.findByLabelText("Usuario *").as("username");
    cy.findByLabelText('Contraseña *').as('password');
    cy.get('@username').type(user);
    cy.get('@password').type(errorPassword);
    cy.get('@username').should('have.value', user);
    cy.get('@password').should('have.value', errorPassword);
    cy.findByRole('button', { name: 'Login' }).click();

    cy.findByRole('alert').should('have.text', 'Usuario y/o password no válidos');

    //ASSERT
  });

  it('visit the login page and login OK', () => {
    //ARRANGE
    const user = "admin";
    const errorPassword = "test";

    // ACT
    cy.visit('/');
    cy.findByLabelText("Usuario *").as("username");
    cy.findByLabelText('Contraseña *').as('password');
    cy.get('@username').type(user);
    cy.get('@password').type(errorPassword);
    cy.get('@username').should('have.value', user);
    cy.get('@password').should('have.value', errorPassword);
    cy.findByRole('button', { name: 'Login' }).click();

    cy.url().should('eq', 'http://localhost:8080/#/submodule-list');

    //ASSERT
  });
});
