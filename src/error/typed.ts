/**
 * Types an error with all three core properties visible: type (name), cause (message) and stack (trace).
 */
export type TypedError = {
	type: string;
	cause: string;
	stack: string | undefined;
};

/**
 * Creates a new [TypedError] with the option of inferring the type value from a specific [TypedError].
 *
 * @param type - the identifier of the error
 * @param cause - the message that describes the error
 * @param stack - the trace of the execution stack up until the error origin.
 * @returns an object of type [TypedError]
 */
export const TypedError = <T extends TypedError>(
	type: Pick<T, 'type'>['type'],
	cause: string,
	stack?: string
) => {
	return {
		type: type,
		cause: cause,
		stack: stack
	};
};

/**
 * Type-guard predicate that checks if a [TypedError] is of a specific type.
 *
 * @param value - the [TypedError] value to check
 * @param type - the type literal that asserts if the value is of required type.
 */
export const isTypedError = <T extends TypedError>(
	value: TypedError,
	type: Pick<T, 'type'>['type']
): value is T => value.type === type;

/**
 * Wraps a [TypedError] in a [Error].
 *
 * @param value - the [TypedError] to wrap
 * @returns the wrapped error
 */
export const wrap = (value: TypedError) => {
	const internal = new Error(value.cause);

	internal.name = value.type;
	internal.stack = value.stack;

	return internal;
};

/**
 * Unwraps an [Error] in a [TypedError].
 *
 * @param value - the [Error] to unwrap
 * @returns the unwrapped error
 */
export const unwrap = (value: Error) => {
	return {
		cause: value.message,
		type: value.name,
		stack: value.stack
	} satisfies TypedError;
};
