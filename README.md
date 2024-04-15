# foundation-types

Curated package with types I believe all packages and apps need to promote safeness and reduced side effects.

![npm version](https://badgen.net/npm/v/@web-pacotes/foundation-types) ![npm total downloads](https://badgen.net/npm/dt/@web-pacotes/foundation-types) ![bundlephobia bundle size](https://badgen.net/bundlephobia/min/@web-pacotes/foundation-types)

---

## How to use

The following is an example how to use the `Either` monad type to eliminate exceptions thrown from a division operation:

```typescript
import { fold, Left, Right } from './either';

function div_numbers(x: number, y: number) {
	if (y === 0.0) {
		return Left('cannot divide number by 0!');
	}

	return Right(x / y);
}

const computation = div_numbers(2, 0);
fold(
	computation,
	(l) => console.error(l),
	(r) => console.info(`division = ${r}`)
);
```

## Features

- Option type (either a value is present or absent)
- Either type (either a value or other value)
- Lazy type (lazily computed value)
- Error type (type safe errors)
  - IO (Read/Write) error type
  - Unknown error type
  - Wrapping/Unwrapping typed error in internal errors
  - Wrapper around try/catch to execute callbacks in a safe throwable environment

### Upcoming features

New types come as I need them or as requested through an issue.

---

## Bugs and Contributions

Found any bug (including typos) in the package? Do you have any suggestion
or feature to include for future releases? Please create an issue via
GitHub in order to track each contribution. Also, pull requests are very
welcome!

To contribute, start by setting up your local development environment. The [setup.md](setup.md) document will onboard
you on how to do so!
