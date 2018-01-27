import removeCommas from './math.services';

describe('math service', () => {
  it('remove commas from val', () => {
    expect(removeCommas('1,345')).toEqual('1345');
  });
});
