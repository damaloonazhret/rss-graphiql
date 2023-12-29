import { describe, expect, test, vitest } from 'vitest';
import { showToastError, showToastSuccess } from './toasts';
import { toast } from 'react-toastify';

describe('toasts', () => {
  test('should display an error toast message with the provided message string', () => {
    const toastErrorSpy = vitest.spyOn(toast, 'error');
    const message = 'This is an error message';

    showToastError(message);

    expect(toastErrorSpy).toHaveBeenCalledWith(message, expect.any(Object));
    expect(toastErrorSpy).toHaveBeenCalledTimes(1);
  });

  test('should display a success toast message with the provided message string', () => {
    const message = 'Test message';
    const toastSpy = vitest.spyOn(toast, 'success');

    showToastSuccess(message);

    expect(toastSpy).toHaveBeenCalledWith(message, expect.any(Object));
  });
});
