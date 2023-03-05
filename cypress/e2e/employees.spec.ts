describe('Employees screen', () => {
    it('should number of employees be 5 in first page', () => {
        // ARRANGE

        // ACT
        cy.visit('/employees');

        // ASSERT
        const elements = cy.get('table tbody').children();
        elements.should('have.length', 5);

    })

    it('should filter the number of employees be 1 in first page', () => {
      // ARRANGE

      // ACT
      cy.visit('/employees');
      cy.findByRole('textbox').type("Daniel");

      // ASSERT
      const elements = cy.get('table tbody').children();
      elements.should('have.length', 1);

  });

  it('should delete the second employee of the list when delete button is clicked', () => {
    // ARRANGE

    // ACT
    cy.visit('/employees');

    cy.findByText("Jose Gomez").should('not.be.null');

    cy.findAllByRole('button', {name: 'delete button'}).then(
      ($buttons) => {
        $buttons[1].click();
    });
    cy.findByRole('button', {name: 'Aceptar'}).click();
    // ASSERT
    cy.findAllByText("Jose Gomez").should('have.length', 0);

});


it('should edit the first employee of the list when edit button is clicked', () => {
  // ARRANGE
  cy.on('window:before:load', (win) => {
    cy.stub(win.console, 'log').as("consoleLog");
  });

  // ACT
  cy.visit('/employees');

  cy.findAllByRole('button', {name: 'edit button'}).then(
    ($buttons) => {
      $buttons[0].click();
  });

  cy.findByLabelText("Nombre").should("have.value", "Prueba Nombre");

  cy.findByLabelText("Nombre").clear().type("Nombre Modificado");
  cy.findByLabelText("Email").clear().type("esto no funciona");

  //cy.findByLabelText("Email").clear().type("test@empresa.com");
  //cy.findByRole('button', {name: 'Aceptar'}).click();
  // ASSERT
  //cy.findAllByText("Jose Gomez").should('have.length', 0);
  cy.findByRole('button', {name: 'Guardar'}).click();
  cy.findAllByText("La dirección de correo no está bien formada").should('not.be.null');

  cy.findByLabelText("Email").clear().type("test@empresa.com");
  cy.findByRole('button', {name: 'Guardar'}).click();
  cy.get('@consoleLog').should(
    'have.been.calledWith',
    'Guardado'
  );
});

it('should add new employee when form is completed', () => {
  // ARRANGE
  cy.on('window:before:load', (win) => {
    cy.stub(win.console, 'log').as("consoleLog");
  });
  // ACT
  cy.visit('/employees');

  cy.findByRole('button', {name: 'Nuevo empleado'}).click();

  cy.findByLabelText("Clave Temporal").type("temporalPassword");
  cy.findByLabelText("Nombre").type("Nombre");
  cy.findByLabelText("Email").type("test@empresa.com");

  cy.findByRole('button', {name: 'Guardar'}).click();

  cy.get('@consoleLog').should(
    'have.been.calledWith',
    'Guardado'
  );
});


});
