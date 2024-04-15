import { isTypedError, TypedError } from './typed';

/**
 * A [TypedError] for IO read operations (like reading bytes from a stream).
 */
type ReadError = { readonly type: 'read-error' } & TypedError;

/**
 * A [TypedError] for IO write operations (like writing bytes from a stream).
 */
type WriteError = { readonly type: 'write-error' } & TypedError;

/**
 * Types a [TypedError] for IO operations.
 */
export type IOError = ReadError | WriteError;

/**
 * Creates a [IOError] for a faulty read operation.
 *
 * @param cause - what caused the read error
 * @param stack - the stack trace until the error origin
 */
export const ReadError = (cause: string, stack?: string) =>
	TypedError<ReadError>('read-error', cause, stack);

/**
 * Creates a [IOError] for a faulty write operation.
 *
 * @param cause - what caused the read error
 * @param stack - the stack trace until the error origin
 */
export const WriteError = (cause: string, stack?: string) =>
	TypedError<WriteError>('write-error', cause, stack);

/**
 * Type-guard predicate that checks if an [IOError] is of type [ReadError].
 *
 * @param value - the error value to check
 */
export const isReadError = (value: IOError) =>
	isTypedError<ReadError>(value, 'read-error');

/**
 * Type-guard predicate that checks if an [IOError] is of type [WriteError].
 *
 * @param value - the error value to check
 */
export const isWriteError = (value: IOError) =>
	isTypedError<WriteError>(value, 'write-error');
