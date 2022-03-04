/* import AsteroidsScene from "../scenes/templates/default";
import cookies from "../cookies";

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
    
    let pauseAndThenResume = () => {
      this.physics.pause()
      menuclick.once("click", resumeAndThenPause)
    }
    let resumeAndThenPause = () => {
      this.physics.resume()
      menuclick.once("click", pauseAndThenResume)
    }

    let jugando = cookies.get('jugando')
    if (jugando == "true") {
      menuclick.once("click", pauseAndThenResume)
    } else if (jugando == "false") {
      menuclick.once("click", resumeAndThenPause)
    }
  }


  let menu = <HTMLInputElement>document.getElementById('menu')
  menu.style.width = (window.innerWidth * 0.6) + 'px'
  menu.style.height = (window.innerHeight * 0.8) + 'px'
  menu.style.top = (window.innerHeight * 0.1) + 'px'
  menu.style.left = (window.innerWidth * 0.2) + 'px'

}
*/