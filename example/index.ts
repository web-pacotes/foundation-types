import { Left, Right, fold } from 'foundation-types';

function main() {
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
}

main();
