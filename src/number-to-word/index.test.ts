import { convertNumberToWord } from './index'
describe('convertNumberToWord test', () => {
  it('should pass with a single digit', () => {
    expect(convertNumberToWord(1)).toEqual('one');
    expect(convertNumberToWord(2)).toEqual('two');

    expect(convertNumberToWord(4)).toEqual('four');
  });

  it('should pass with two digits', () => {
    expect(convertNumberToWord(11)).toEqual('eleven');
    expect(convertNumberToWord(24)).toEqual('twenty four');
    expect(convertNumberToWord(45)).toEqual('fourty five');
  });

  it('should pass with three digits', () => {
    expect(convertNumberToWord(100)).toEqual('one hundred');
    expect(convertNumberToWord(642)).toEqual('six hundred and fourty two');
    expect(convertNumberToWord(405)).toEqual('four hundred and five');
  });

  it('should pass with four digits', () => {
    expect(convertNumberToWord(1000)).toEqual('one thousand');
    expect(convertNumberToWord(9281)).toEqual('nine thousand two hundred and eighty one');
    expect(convertNumberToWord(7492)).toEqual('seven thousand four hundred and ninety two');
  });

  it('should pass with five digits', () => {
    expect(convertNumberToWord(10000)).toEqual('ten thousand');
    expect(convertNumberToWord(99281)).toEqual('ninety nine thousand two hundred and eighty one');
    expect(convertNumberToWord(77492)).toEqual('seventy seven thousand four hundred and ninety two');
  });

   it('should pass with six digits', () => {
    expect(convertNumberToWord(100000)).toEqual('one hundred thousand');
    expect(convertNumberToWord(999281)).toEqual('nine hundred and ninety nine thousand two hundred and eighty one');
    expect(convertNumberToWord(777492)).toEqual('seven hundred and seventy seven thousand four hundred and ninety two');
  });

  it('should pass with seven digits', () => {
    expect(convertNumberToWord(1000000)).toEqual('one million');
    expect(convertNumberToWord(1990603)).toEqual('one million nine hundred and ninety thousand six hundred and three');
  })

  it('should explode if overly large numbers are attempted to be converted', () => {
    expect(() => {
      convertNumberToWord(1999999999)
    }).toThrow(`Numbers larger than 999 million are not supported.`)
  })
})
