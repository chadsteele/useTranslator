
const languageCodes = {
    amharic: "am", arabic: "ar", basque: "eu", bengali: "bn", british: "en-Gb",
    brazilian: "pt-BR", bulgarian: "bg", catalan: "ca", cherokee: "chr", chinese: "zh-CN", croatian: "hr",
    czech: "cs", danish: "da", dutch: "nl", english: "en", estonian: "et", filipino: "fil",
    finnish: "fi", french: "fr", german: "de", greek: "el", gujarati: "gu", hebrew: "iw",
    hindi: "hi", hungarian: "hu", icelandic: "is", indonesian: "id", italian: "it", japanese: "ja",
    kannada: "kn", korean: "ko", latvian: "lv", lithuanian: "lt", malay: "ms", malayalam: "ml",
    marathi: "mr", norwegian: "no", polish: "pl", portuguese: "pt-PT", romanian: "ro", russian: "ru",
    serbian: "sr", slovak: "sk", slovenian: "sl", spanish: "es", swahili: "sw", swedish: "sv",
    taiwanese: "zh-TW", tamil: "ta", telugu: "te", thai: "th", turkish: "tr", ukrainian: "uk",
    urdu: "ur", vietnamese: "vi", welsh: "cy",
}

export class TranslationApi {

    cache = {};  //map of old requests, don't repeat requests since translations won't change

    translate = async (text, lang, debug) => {

        if (!text) return "";  //if blank, return blank

        text = text || '';
        lang = lang || 'en';
        lang = languageCodes[lang.toLowerCase()] || lang || 'en';

        const url = "https://cors-anywhere.herokuapp.com/"
            + "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=t"
            + "&tl=" + lang
            + "&q=" + encodeURI(text);

        if (url.indexOf('undefined') > -1) return "";  //one last check to ensure google doesn't block us for being stupid
        if (this.cache[url]) return this.cache[url];  //remember and return old queries

        console.log(url);

        //It's real easy to get blocked by google for sending too many requests,
        //so until debounce, etc. is working, it's best to not call google for now
        if (debug) return url;

        return await fetch(url).then(async data => {
            if (!data.ok || !data.json) {
                throw Error(`Error ${data.status} - ${data.statusText}`);
            }
            return await data.json().then(ary => {
                this.cache[url] = ary[0][0][0] || '';
                return this.cache[url];
            })
        });
    }

}

export default TranslationApi = new TranslationApi();