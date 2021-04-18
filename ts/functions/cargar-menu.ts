import AsteroidsScene from "../scenes/templates/asteroids-scene";
import { mostrarTexto } from './animateCSS';
import { cookies } from "./cookie-manager";
import animateCSS from './animateCSS';
export function actualizarNivel(this: AsteroidsScene) {
  let puntos = this.dato('puntos')
  let canvas = document.querySelector('canvas')
  if (canvas != null) {
    if (puntos < 100) {
      if (this.dato('nivel') != 1) {
        mostrarTexto(`Nivel ${this.dato('nivel', 1)}`)
      }
      document.body.className = "level-1"
      canvas.classList.remove('level-2', 'level-3', 'level-4')
      canvas.classList.add('level-1')
    } else if (puntos < 400) {
      if (this.dato('nivel') != 2) {
        mostrarTexto(`Nivel ${this.dato('nivel', 2)}`)
      }
      document.body.className = "level-2"
      canvas.classList.remove('level-1', 'level-3', 'level-4')
      canvas.classList.add('level-2')
    } else if (puntos < 1000) {
      if (this.dato('nivel') != 3) {
        mostrarTexto(`Nivel ${this.dato('nivel', 3)}`)
      }
      document.body.className = "level-3"
      canvas.classList.remove('level-1', 'level-2', 'level-4')
      canvas.classList.add('level-3')
    } else {
      if (this.dato('nivel') != 4) {
        mostrarTexto(`Nivel ${this.dato('nivel', 4)}`)
      }
      document.body.className = "level-4"
      canvas.classList.remove('level-1', 'level-2', 'level-3')
      canvas.classList.add('level-4')
    }
  }
}

export function crearMenu() {
  let menu = document.createElement("div")
  document.body.appendChild(menu)
  menu.id = "menu"
  menu.style.display = 'none'
  menu.style.position = 'absolute'
  let getMenuHTML = new XMLHttpRequest()
  getMenuHTML.addEventListener('readystatechange', e => {
    e.preventDefault()
    if (getMenuHTML.readyState === 4 && getMenuHTML.status === 200) {
      menu.innerHTML = getMenuHTML.responseText
    }
  })
  getMenuHTML.open('GET', 'menu-pausa.html')
  getMenuHTML.send()
  let menuButton = document.createElement("div")
  document.body.appendChild(menuButton)
  menuButton.id = 'menu-button'
  menuButton.style.display = 'none'
  menuButton.style.position = 'absolute'
  menuButton.addEventListener('click', e => {
    e.preventDefault()
    if (menu.style.display == "flex") {
      cookies.set('jugando', 'true')
      animateCSS(menu, 'fadeOut', 200)
        .then(() => menu.style.display = "none")
    } else if (menu.style.display == "none") {
      menu.style.display = "flex"
      animateCSS(menu, 'fadeIn', 200)
      cookies.set('jugando', 'false')
    }
    animateCSS(menuButton, 'pulse', 300)
  }, false)
  cookies.set('jugando', 'true')
}

window.addEventListener('resize', e => {
  e.preventDefault()
  let menuButton = document.querySelector<HTMLDivElement>('#menu-button')
  let canvas = document.querySelector('canvas')
  if (menuButton != null && canvas != null) {
    menuButton.style.display = 'block'
    menuButton.style.width = '50px'
    menuButton.style.height = '50px'
    menuButton.style.top = (window.innerHeight - 65) + 'px'
    menuButton.style.left = (window.innerWidth - 65) + 'px'
  }
  let menu = <HTMLInputElement>document.getElementById('menu')
  menu.style.width = (window.innerWidth * 0.6) + 'px'
  menu.style.height = (window.innerHeight * 0.8) + 'px'
  menu.style.top = (window.innerHeight * 0.1) + 'px'
  menu.style.left = (window.innerWidth * 0.2) + 'px'
}, false)

export function cargarMenu(this: AsteroidsScene) {
  let menuButton = document.querySelector<HTMLDivElement>('#menu-button')
  let canvas = document.querySelector('canvas')
  if (menuButton != null && canvas != null) {
    menuButton.style.display = 'block'
    menuButton.style.width = '50px'
    menuButton.style.height = '50px'
    menuButton.style.top = (window.innerHeight - 65) + 'px'
    menuButton.style.left = (window.innerWidth - 65) + 'px'
  }
  
    let menu = <HTMLInputElement>document.getElementById('menu')
    menu.style.width = (window.innerWidth * 0.6) + 'px'
    menu.style.height = (window.innerHeight * 0.8) + 'px'
    menu.style.top = (window.innerHeight * 0.1) + 'px'
    menu.style.left = (window.innerWidth * 0.2) + 'px'

  let jugando = cookies.get('jugando')
  if (jugando == "true") {
    menuButton.onclick = () => {
      this.physics.pause()
    }
  } else if (jugando == "false") {
    menuButton.onclick = () => {
      this.physics.resume()
    }

  }

}