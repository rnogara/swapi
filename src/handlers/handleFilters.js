export default function handleFilters(option, comparison, number, planets) {
  switch (comparison) {
  case 'maior que':
    return planets.filter((planet) => parseFloat(planet[option]) > number);
  case 'menor que':
    return planets.filter((planet) => parseFloat(planet[option]) < number);
  case 'igual a':
    return planets.filter((planet) => planet[option] === `${number}`);
  default:
    return planets;
  }
}
