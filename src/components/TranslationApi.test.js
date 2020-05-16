import TranslationApi from './TranslationApi';

test('test TranslationApi', () => {
    expect(TranslationApi.translate("testing", "german", true).length > 20).toBe(true);
});

//need more tests!