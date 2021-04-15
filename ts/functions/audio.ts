import { cookies } from "./cookie-manager";

document.getElementById('volumen-efectos')
  ?.addEventListener('change', e => {
    let element = e.target as HTMLInputElement;
    cookies.set('config-volumen-fx', element.value.toString())
  })

document.getElementById('volumen-musica')
  ?.addEventListener('change', e => {
    let element = e.target as HTMLInputElement;
    cookies.set('config-volumen-musica', element.value.toString())
    let audio = document.querySelector<HTMLAudioElement>('#elemento-musica')
    if (audio != null) {
      console.log(audio)
    }
  })