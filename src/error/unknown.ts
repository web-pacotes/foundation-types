import { TypedError } from './typed';

/**
 * A [TypedError] for unknown errors.
 */
export type UnknownError = { readonly type: 'unknown-error' } & TypedError;

/**
 * Standard call to create an [UnknownError].
 *
 * @param cause - what caused the error
 * @param stack - the stack trace until the error origin
 */
export const UnknownError = (cause: string | unknown, stack?: string) => {
	if (typeof cause === 'string') {
		return TypedError<UnknownError>('unknown-error', cause, stack);
	}

	const internal = safeUnknownError(cause);

	return TypedError<UnknownError>(
		'unknown-error',
		internal.message,
		internal.message
	);
};

/**
 * Converts a value of type [unknown] to [Error].
 *
 * @param error - the unknown value
 */
export const safeUnknownError = (error: unknown) =>
	error instanceof Error ? error : new Error(`${error}`);
