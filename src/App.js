import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import useTranslator from './components/useTranslator'


//very simple debounce
let timer;
export const debounce = (func, delay = 700) => {
  //let timer;  // must be outside the debounce function scope for some reason?!
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  }
}

function Box(props) {
  return <div className="Box">
    {props.children}
  </div>
}


function App() {
  const [value, setValue] = useState();
  const [focus, setFocus] = useState();

  const [spanish, toSpanish] = useTranslator('spanish');
  const [german, toGerman] = useTranslator('german');
  const [japanese, toJapanese] = useTranslator('japanese');
  const [english, toEnglish] = useTranslator('english');

  const values = {
    english: english,
    spanish: spanish,
    german: german,
    japanese: japanese,
  }

  const changeFocus = (lang) => {
    setFocus(lang);
    setTimeout(() => setValue(values[lang]), 0);
  }

  const funcs = {
    english: toEnglish,
    spanish: toSpanish,
    german: toGerman,
    japanese: toJapanese,
  }

  const onChange = e => {
    const value = e?.target?.value || e;
    setValue(value);
    debounce(() => {
      Object.keys(funcs).forEach(lang => {
        focus !== lang && funcs[lang](value);  // e.g. toGerman(value)
      });
    })();
  }

  useEffect(() => {
    setFocus('english');
    onChange('fix my bugs');
  }, []);  //eslint-disable-line 

  return (
    <div className="App" focus={focus}>
      <p>The following demo kinda works, but does not work perfectly.  The goal is that you can type into any input and it'll translate into the others.  Please refactor, repair and create thorough jest tests.  Feel free to edit/add languages</p>
      <Box>
        <label><span>english</span>
          <input type="text" value={(focus === 'english' ? value : english) || ''} onChange={onChange} onFocus={() => changeFocus('english')} />
        </label>
      </Box>

      <Box>
        <label>spanish
        <input type="text" value={(focus === 'spanish' ? spanish : spanish) || ''} onChange={onChange} onFocus={() => changeFocus('spanish')} />
        </label>
      </Box>
      <Box>
        <label>japanese
        <input type="text" value={(focus === 'japanese' ? value : japanese) || ''} onChange={onChange} onFocus={() => changeFocus('japanese')} />
        </label>
      </Box>
      <Box>

        <label>german
        <input type="text" value={(focus === 'german' ? value : german) || ''} onChange={onChange} onFocus={() => changeFocus('german')} />
        </label>

      </Box>
    </div>
  );
}

export default App;
