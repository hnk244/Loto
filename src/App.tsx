
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import './App.css';
import { RollItem } from './RollItem';
import { speakVietnamese } from './textToSpeech';
import YouTubeEmbed from './YoutubeEmbed';



function App() {
  const musicList = useMemo(() => ["atq9S7pp1rQ", "vaBpLhFJUh0", 'zu6cyBdWsWQ', 'y_Qb-mSDSrI', 'Jen82pHTyik'], [])
  const [currentMusic, setCurrentMusic] = useState(musicList[0])
  const inputRef = useRef<HTMLInputElement>(null)

  const [storage, dispatch] = useReducer((state: {
    current: number,
    list: number[],
  }, action: { type: string, payload: number }) => {
    switch (action.type) {
      case 'append':
        speakVietnamese(`${action.payload}`)
        return {
          current: action.payload,
          list: [...state.list, action.payload].sort((a, b) => a - b),
        };
      case 'reset':
        return {
          current: 0,
          list: [],
        };
      default:
        return state;
    }

  }, {
    current: 0,
    list: [],
  });

  // const handleCacheSetValue = useCallback(
  //   () => {

  //   },
  //   [JSON.stringify(storage)],
  // )

  const handleGenRandomNumber = useCallback(
    () => {
      let number = Math.floor(Math.random() * 90 + 1);
      while (storage.list.includes(number)) {
        number = Math.floor(Math.random() * 90 + 1);
      }
      return number
    }, [JSON.stringify(storage)]
  )

  const handlRollSet = useCallback(
    () => {
      const rollingNumber = handleGenRandomNumber()
      if (storage.list.length === 0) {
        speakVietnamese(`Con số đầu tiên`)
      }
      dispatch({ type: 'append', payload: rollingNumber });
    },
    [JSON.stringify(storage)],
  )


  const handleNewGame = useCallback(
    () => {
      speakVietnamese(`Bắt đầu ván mới`)
      dispatch({ type: 'reset', payload: 0 });
    },
    [JSON.stringify(storage)],
  )
  const handleApplyMusic = (url?: string) => {
    if (!url) {
      alert('No URL provided');
      return;
    } else {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (!videoId) {
        alert('Invalid URL');
        return;
      }
      setCurrentMusic(videoId)
    }
  }

  return (
    <div className='layout'>
      <div className='header-compose'>
        <button onClick={handleNewGame} className=' new-button'>Ván mới</button>
        <YouTubeEmbed videoId={currentMusic} />
        <select value={currentMusic} onChange={(e) => setCurrentMusic(e.target.value)} className='selection' >
          {
            musicList.map((item, index) => {
              return <option key={index} value={item}>Nhạc loto {index + 1}</option>
            })
          }
        </select>
        <div className="divider"></div>
        <div className='input-compose'>
          <input type="url" ref={inputRef} placeholder='Nhập URL video nhạc Youtube' />
          <button onClick={() => handleApplyMusic(inputRef.current?.value)} >Apply</button>
        </div>
      </div>
      <div className='main-screen'>
        <div className='rolling-number'>
          {!storage.current ? "Đợi bốc số" : storage.current}
        </div>
      </div>
      <div className='button-compose'>
        <button onClick={handlRollSet} className='roll-button btn'><i className="animation"></i>Bốc số<i className="animation"></i></button>
      </div>
      <div className='storage-list'>{
        storage.list.map((item, index) => <RollItem keyValue={index} value={item} />)}</div>
    </div>
  )
}

export default App
