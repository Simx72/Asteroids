import Scene from "../scenes/default";

export default async function animateCSS<T extends HTMLElement>(element: T, animation: string, duration: number = 2000, prefix = 'animate__') {
  // We create a Promise and return it
  const animationName = `${prefix}${animation}`;
  element.style.animationDuration = duration + 'ms'
  element.classList.add(`${prefix}animated`, animationName);

  // When the animation ends, we clean the classes and resolve the Promise

  element.addEventListener('animationend', async ev => {
    ev.stopPropagation();
    element.classList.remove(`${prefix}animated`, animationName);
  }, { once: true });
  return element;
}

export async function mostrarTexto(texto: string, scene: Scene) {
  const node = scene.add.dom(scene.center.x, 10, 'div', {
    width: '100vw'
  }, texto).setVisible(false);
  await animateCSS(node.node as HTMLElement, 'zoomInDown');
  setTimeout(async () => {
    await animateCSS(node.node as HTMLElement, 'fadeOut')
    node.destroy();
  }, 1500)
}