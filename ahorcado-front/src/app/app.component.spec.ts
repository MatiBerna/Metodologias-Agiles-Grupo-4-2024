import { Ahorcado } from './app.component';

describe('Ahorcado', () => {
  let miAhorcado: Ahorcado;

  beforeEach(() => {
    miAhorcado = new Ahorcado('', 'arriesgar');
  });

  it('Ingreso de nombre', () => {
    const nombre = 'Juan Perez';
    const result = miAhorcado.setNombre(nombre);
    expect(result).toBe(nombre);
  });

  it('Ingreso de nombre nulo', () => {
    const nombre = '';
    let errorCapturado: Error | undefined;

    try {
      miAhorcado.setNombre(nombre);
    } catch (error) {
      if (error instanceof Error) {
        errorCapturado = error;
      }
    }

    expect(errorCapturado).toBeDefined();
    expect(errorCapturado!.message).toMatch(/^Debe ingresar un nombre valido$/);
  });

  it('Arriesgar letra, es incorrecta y pierde 1 vida', () => {
    const letra = 'd';
    const result = miAhorcado.arriesgarLetra(letra);
    expect(result).toBe('Letra incorrecta, intentos restantes: 6');
  });

  it('Arriesgar letra y es correcta', () => {
    const letra = 'a';
    const result = miAhorcado.arriesgarLetra(letra);
    expect(result).toBe('Letra correcta: a _ _ _ _ _ _ a _');
  });

  it('Arriesgar palabra y es incorrecta', () => {
    const palabra = 'arriesgarte';
    const result = miAhorcado.arriesgarPalabra(palabra);
    expect(result).toBe('Palabra incorrecta, intentos restantes: 5');
  });

  it('Arriesgar palabra y es correcta', () => {
    const palabra = 'arriesgar';
    const result = miAhorcado.arriesgarPalabra(palabra);
    expect(result).toBe('Juego ganado');
  });

  it('Mostrar vidas restantes', () => {
    const result = miAhorcado.devuelveVidas();
    expect(result).toBe(7);
  });

  it('Mostrar estado de partida perdida', () => {
    const palabra = 'ykdjzlw';
    palabra.split('').forEach((letra) => {
      miAhorcado.arriesgarLetra(letra);
    });

    const result = miAhorcado.estadoPartida();
    expect(result).toBe('Juego perdido');
  });

  it('Mostrar estado de partida en curso', () => {
    const palabra = 'aij';
    palabra.split('').forEach((letra) => {
      miAhorcado.arriesgarLetra(letra);
    });

    const result = miAhorcado.estadoPartida();
    expect(result).toBe('Palabra: a _ _ i _ _ _ a _. Vidas restantes: 6');
  });

  it('Ganar partida', () => {
    const letras = ['a', 'r', 'i', 'e', 's', 'g'];
    letras.forEach((letra) => miAhorcado.arriesgarLetra(letra));
    const result = miAhorcado.estadoPartida();
    expect(result).toBe('Juego ganado');
  });

  it('Debería asignar la palabra "prueba"', () => {
    const palabra = 'prueba';
    miAhorcado.setPalabra('', palabra);
    expect(miAhorcado.palabra).toBe(palabra);
  });

  it('should assign a random easy word from the easy words bank', () => {
    miAhorcado.setPalabra('facil');
    expect(miAhorcado.palabrasFaciles).toContain(miAhorcado.palabra);
  });

  it('should assign a random intermediate word from the intermediate words bank', () => {
    miAhorcado.setPalabra('intermedio');
    expect(miAhorcado.palabrasIntermedias).toContain(miAhorcado.palabra);
  });

  it('should assign a random hard word from the hard words bank', () => {
    miAhorcado.setPalabra('dificil');
    expect(miAhorcado.palabrasDificiles).toContain(miAhorcado.palabra);
  });

  it('should throw an error if the difficulty is not valid', () => {
    const palabra = 'jaksd';
    let errorCapturado: Error | undefined;

    try {
      miAhorcado.setPalabra(palabra);
    } catch (error) {
      errorCapturado = error as Error;
    }

    expect(errorCapturado).toBeDefined();
    expect(errorCapturado!.message).toMatch(/^Dificultad no valida$/);
  });
});
