import { type Either, Left } from '../monad';
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
 * Sane as [safeThrowCall] but for an asynchronous callback.
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
