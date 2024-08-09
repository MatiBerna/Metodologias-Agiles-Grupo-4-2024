describe("Prueba de Arriesgar Letra", () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200"); // Ajusta la URL según tu configuración
      cy.get('input[placeholder="Palabra para iniciar (opcional)"]').type("casa"); // Ingresa una palabra
      cy.get("button").contains("Iniciar Juego").click(); // Haz clic en el botón de inicio del juego
    });
  
    it("Debería arriesgar palabra y acertar", () => {
      cy.get('input[placeholder="Arriesgar Palabra"]').type("casa"); // Ingresa una letra
      cy.get("button").contains("Arriesgar Palabra").click(); // Haz clic en el botón de arriesgar letra
  
      // Verifica que el mensaje de letra correcta o incorrecta es mostrado
      cy.get(".alert.alert-info").should("be.visible"); // Asegúrate de que el mensaje esté visible
    });
  });
  