
describe('Prueba de Inicio de Juego', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200'); // Ajusta la URL según tu configuración
    });
    it('Debería iniciar el juego con una palabra ingresada', () => {
      cy.get('input[placeholder="Palabra para iniciar (opcional)"]').type('cicatriz'); // Ingresa una palabra
      cy.get('button').contains('Iniciar Juego').click(); // Haz clic en el botón de inicio del juego
  
      // Verifica que el estado inicial del juego es mostrado
      cy.get('.alert.alert-info').should('be.visible'); // Asegúrate de que el mensaje de inicio esté visible
      cy.get('.alert.alert-secondary').should('contain', 'Palabra:'); // Verifica que el estado del juego muestra "Palabra:"
    });
  });
  