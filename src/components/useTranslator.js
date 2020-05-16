import { useState } from 'react'
import TranslationApi from './TranslationApi'

export function useTranslator(target = 'en') {

    const [lang, setLanguage] = useState(target || 'en');
    const [value, set] = useState('');

    const translate = async (text, target) => {
        if (target) setLanguage(target);
        const data = await TranslationApi.translate(text, target || lang || 'en');
        set(data);
        return data;
    }

    return [value, translate, set];
};

export default useTranslator;