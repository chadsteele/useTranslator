import useTranslator from './useTranslator';
import { renderHook } from '@testing-library/react-hooks'

test('test useTranslator set', () => {
    const [english, translate, set] = renderHook(() => useTranslator());
    const expected = "dog";
    set("dog")
    expect(english).toBe(expected);
});

test('test useTranslator translate dog', () => {
    const [english, translate, set] = renderHook(() => useTranslator());
    const expected = "dog";
    translate("dog");
    expect(english).toBe(expected);
});


//need more tests!