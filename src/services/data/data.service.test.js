import wookieeToEnglish from './data.service';

describe('data service', () => {
  it('convert wookiee to english keys', () => {
    const jsonSample = { oaoohuwhao: 37, whwokao: 'acaoaoakc://cohraakah.oaoo/raakah/cakwooaahwoc/?akrarrwo=2&wwoorcscraao=ohooooorahwowo' };
    expect(wookieeToEnglish(jsonSample)).toEqual({ count: 37, next: 'https://swapi.co/api/species/?page=2&format=wookiee' });
  });
});
