import * as HttpStatus from 'http-status-codes';

export async function handleErrors(response: Response, message?: string) {
  if (!response.ok) {
    const error = new Error();
    error.name = `${response.status.toString()} ${HttpStatus.getStatusText(
      response.status
    )}`;
    error.message =
      message ||
      (await response.json()).reason ||
      HttpStatus.getStatusText(response.status);
    throw error;
  }

  return response;
}
