import * as HttpStatus from 'http-status-codes';

export async function handleErrors(response: Response, message?: string) {
  if (!response.ok) {
    const error = new Error();
    const reason =
      response.status === 500
        ? HttpStatus.getStatusText(response.status)
        : (await response.json()).reason;

    error.name = `${response.status.toString()} ${HttpStatus.getStatusText(
      response.status
    )}`;

    error.message = message || reason;

    throw error;
  }

  return response;
}
