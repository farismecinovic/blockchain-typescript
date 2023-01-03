import { Block } from '../block';

describe('Class Block', () => {
  const block = new Block([], '0');

  const calcHashSpy = jest.spyOn(block, 'calcualteHash');
  const mineBlockSpy = jest.spyOn(block, 'mineBlock');
  jest.spyOn(block, 'hasValidTransactions');

  it('defines methods calculateHash(), mineBlock() and hasValidTrasactions()', () => {
    expect(typeof block.calcualteHash).toBe('function');
    expect(typeof block.mineBlock).toBe('function');
    expect(typeof block.hasValidTransactions).toBe('function');
  });

  it('should calculate hash for block', () => {
    expect(block.calcualteHash()).toBeTruthy();
    expect(block.calcualteHash).toHaveBeenCalledTimes(1);
    calcHashSpy.mockClear();
  });

  it('should mine block when called', () => {
    expect(block.mineBlock(3)).toBeUndefined();
    expect(block.mineBlock).toHaveBeenCalledTimes(1);

    expect(block.hash).toContain('000');
    mineBlockSpy.mockClear();
  });
});
