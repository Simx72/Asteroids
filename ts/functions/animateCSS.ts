function animateCSS(element: string, animation: string, prefix = 'animate__') {
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

export function mostrarTexto(texto: string) {
  let elt = document.getElementById('motrar-texto')
  if (elt) {
    elt.classList.remove('hide')
    elt.innerHTML = texto
    animateCSS('#motrar-texto', 'backInDown')
      .then(() => {
        animateCSS('#mostrar-texto', 'backOutDown')
          .then(() => {
            if (elt) {
              elt.classList.add('hide')
              elt.innerHTML = ""
            }
          })
      })
  }
}

mostrarTexto('hola')