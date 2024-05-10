import { type Either, Left, Right } from '../monad';
import type { TypedError } from './typed';
import { safeUnknownError, UnknownError } from './unknown';

/**
 * Executes a callback in a safe throwable environment, by catching errors and
 * returning them in a [Either<L, R>] value.
 *
 * @param call - the callback to execute
 * @param onError - a callback to transform an internal [Error] in a [TypedError]
 */
export const safeThrowCall = <L extends TypedError, R>(
	call: () => Either<L, R>,
	onError?: (error: Error) => L
) => {
	try {
		return call();
	} catch (error) {
		const internal = safeUnknownError(error);

		return Left(onError?.call(this, internal) ?? UnknownError(internal));
	}
};

/**
 * Same as [safeThrowCall] but for an asynchronous callback.
 *
 * @param call - the asynchronous callback to execute
 * @param onError - a callback to transform an internal [Error] in a [TypedError]
 */
export const safeAsyncThrowCall = async <L extends TypedError, R>(
	call: () => Promise<Either<L, R>>,
	onError?: (error: Error) => L
) => {
	try {
		return await call();
	} catch (error) {
		const internal = safeUnknownError(error);

		return Left(onError?.call(this, internal) ?? UnknownError(internal));
	}
};

/**
 * Executes a callback in a safe throwable environment, by catching errors and
 * returning them in a [Either<L, O>] value.
 *
 * Same purpose as [safeThrowCall] but doesn't require the right hand to be a value of type Either.
 * 
 * Inspired from Kotlin `runCatching` top-level function {@link https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/run-catching.html}
 *
 * @param call - the callback to execute
 * @param onError - a callback to transform an internal [Error] in a [TypedError]
 */
export const runCatching = <L extends TypedError, O>(
	call: () => O,
	onError?: (error: Error) => L
) => safeThrowCall(() => Right<L, O>(call()), onError);

/**
 * Same as [runCatching] but for an asynchronous callback.
 *
 * Same purpose as [safeThrowCall] but doesn't require the right hand to be a value of type Either.
 *
 * @param call - the asynchronous callback to execute
 * @param onError - a callback to transform an internal [Error] in a [TypedError]
 */
export const runAsyncCatching = async <L extends TypedError, O>(
	call: () => Promise<O>,
	onError?: (error: Error) => L
) => safeAsyncThrowCall(async () => Right<L, O>(await call()), onError);
