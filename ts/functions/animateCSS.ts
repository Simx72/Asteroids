export function animateCSS(element: string, animation: string, prefix = 'animate__') {
  // We create a Promise and return it
  return new Promise((resolve, _reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    if (node != null) {
      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise

      node.addEventListener('animationend', (event) => {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve(void 0);
      }, { once: true });
    }
  });
}