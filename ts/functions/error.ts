export function sendError(e: any, debug?: boolean) {
  if (debug) {
    throw e;
  } else {
    console.error(e)
  }
}