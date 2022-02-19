import cookies from './cookies';

test('Cookie manager works', () => {
  expect(
    cookies.get('config-volumen-fx')
  ).toBe('100');

  expect(
    cookies.getNum('config-volumen-musica')
  ).toBe(100);

  expect(
    cookies.get("test")
  ).toBe("Un valor de prueba 🧐")

  expect(
    cookies.remove("test")
  ).toBe(cookies)

  expect(
    cookies.get("test")
  ).toBe("")

});