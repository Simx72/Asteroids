function animateCSS<T = string | HTMLElement>(element: T, animation: string, prefix = 'animate__') {
  // We create a Promise and return it
  return new Promise<T>((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    let node: HTMLElement | null
    if (element instanceof HTMLElement) {
      node = element;
    } else if (typeof element == 'string') {
      let select = document.querySelector<HTMLElement>(element);
      if (select === null) {
        reject(new Error('The element is null'))
      }
      node = select;
    } else {
      node = null;
      reject(new Error("The element must be either a 'HTMLElement' or a string"))
    }

    if (node != null) {
      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise

      node.addEventListener('animationend', (event) => {
        if (node != null) {
          event.stopPropagation();
          node.classList.remove(`${prefix}animated`, animationName);
          resolve(element);
        }
      }, { once: true });
    }
  });
}

export function mostrarTexto(texto: string) {
  let elt = document.getElementById('mostrar-texto')
  if (elt) {
    elt.classList.remove('hide')
    elt.innerHTML = texto
    animateCSS('#mostrar-texto', 'zoomInDown')
      .then(() => {
        setTimeout(() =>
          animateCSS('#mostrar-texto', 'fadeOut')
            .then(() => {
              if (elt) {
                elt.classList.add('hide')
                elt.innerHTML = ""
              }
            })
          , 1500)
      })
  }
}