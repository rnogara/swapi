export default function useFilterCase() {
  function filterCase(option, comparison, number, planets) {
    switch (comparison) {
    case 'maior que':
      return planets.filter((planet) => parseFloat(planet[option]) > number);
    case 'menor que':
      return planets.filter((planet) => parseFloat(planet[option]) < number);
    default:
      return planets.filter((planet) => planet[option] === `${number}`);
    }
  }
  return {
    filterCase,
  };
}
