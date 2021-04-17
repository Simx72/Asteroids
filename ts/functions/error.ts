export function sendError(debug: boolean, e: any) {
  if (debug) {
    throw e
  } else {
    console.error(e)
  }
}