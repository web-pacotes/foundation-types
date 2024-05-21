import { describe, expect, test } from '@jest/globals';
import {
	runAsyncCatching,
	runCatching,
	safeAsyncThrowCall,
	safeThrowCall
} from './call';
import { Either, fold, isRight, Right } from '../monad';
import { isTypedError, TypedError } from './typed';
import { UnknownError } from './unknown';

describe('call', () => {
	describe('safeThrowCall', () => {
		test('returns callback result if no error is thrown', () => {
			const callback = () => Right(2 + 2) satisfies Either<TypedError, number>;

			const result = safeThrowCall(callback);
			const isRightHanded = isRight(result);

			expect(isRightHanded).toBeTruthy();
		});

		test('returns UnknownError if error is thrown and error transform callback is not passed', () => {
			const callback = () => {
				throw 'error';
			};

			const result = safeThrowCall(callback);
			const isUnknownError = fold(
				result,
				(l) => isTypedError<UnknownError>(l, 'unknown-error'),
				(r) => r === false
			);

			expect(isUnknownError).toBeTruthy();
		});

		test('returns transformed error if error is thrown and transform callback is passed', () => {
			const type = 'transformed-error';

			const callback = () => {
				throw 'error';
			};

			const transformErrorCallback = (error: Error) =>
				TypedError(type, error.message);

			const result = safeThrowCall(callback, transformErrorCallback);
			const isTransformedError = fold(
				result,
				(l) => isTypedError(l, type),
				(r) => r === false
			);

			expect(isTransformedError).toBeTruthy();
		});
	});

	describe('safeAsyncThrowCall', () => {
		test('returns callback result if no error is thrown', async () => {
			const callback = async () =>
				Right(2 + 2) satisfies Either<TypedError, unknown>;

			const result = await safeAsyncThrowCall(callback);
			const isRightHanded = isRight(result);

			expect(isRightHanded).toBeTruthy();
		});

		test('returns UnknownError if error is thrown and error transform callback is not passed', async () => {
			const callback = () => {
				throw 'error';
			};

			const result = await safeAsyncThrowCall(callback);
			const isUnknownError = fold(
				result,
				(l) => isTypedError<UnknownError>(l, 'unknown-error'),
				(r) => r === false
			);

			expect(isUnknownError).toBeTruthy();
		});

		test('returns transformed error if error is thrown and transform callback is passed', async () => {
			const type = 'transformed-error';

			const callback = () => {
				throw 'error';
			};

			const transformErrorCallback = (error: Error) =>
				TypedError(type, error.message);

			const result = await safeAsyncThrowCall(callback, transformErrorCallback);
			const isTransformedError = fold(
				result,
				(l) => isTypedError(l, type),
				(r) => r === false
			);

			expect(isTransformedError).toBeTruthy();
		});
	});

	describe('runCatching', () => {
		test('returns callback result if no error is thrown', () => {
			const callback = () => 2 + 2;

			const result = runCatching(callback);
			const isRightHanded = isRight(result);

			expect(isRightHanded).toBeTruthy();
		});

		test('returns UnknownError if error is thrown and error transform callback is not passed', () => {
			const callback = () => {
				throw 'error';
			};

			const result = runCatching(callback);
			const isUnknownError = fold(
				result,
				(l) => isTypedError<UnknownError>(l, 'unknown-error'),
				(r) => r === false
			);

			expect(isUnknownError).toBeTruthy();
		});

		test('returns transformed error if error is thrown and transform callback is passed', () => {
			const type = 'transformed-error';

			const callback = () => {
				throw 'error';
			};

			const transformErrorCallback = (error: Error) =>
				TypedError(type, error.message);

			const result = runCatching(callback, transformErrorCallback);
			const isTransformedError = fold(
				result,
				(l) => isTypedError(l, type),
				(r) => r === false
			);

			expect(isTransformedError).toBeTruthy();
		});
	});

	describe('runAsyncCatching', () => {
		test('returns callback result if no error is thrown', async () => {
			const callback = async () => 2 + 2;

			const result = await runAsyncCatching(callback);
			const isRightHanded = isRight(result);

			expect(isRightHanded).toBeTruthy();
		});

		test('returns UnknownError if error is thrown and error transform callback is not passed', async () => {
			const callback = () => {
				throw 'error';
			};

			const result = await runAsyncCatching(callback);
			const isUnknownError = fold(
				result,
				(l) => isTypedError<UnknownError>(l, 'unknown-error'),
				(r) => r === false
			);

			expect(isUnknownError).toBeTruthy();
		});

		test('returns transformed error if error is thrown and transform callback is passed', async () => {
			const type = 'transformed-error';

			const callback = () => {
				throw 'error';
			};

			const transformErrorCallback = (error: Error) =>
				TypedError(type, error.message);

			const result = await runAsyncCatching(callback, transformErrorCallback);
			const isTransformedError = fold(
				result,
				(l) => isTypedError(l, type),
				(r) => r === false
			);

			expect(isTransformedError).toBeTruthy();
		});
	});
});
