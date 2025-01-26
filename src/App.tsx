
import { useCallback, useReducer } from 'react';
import './App.css';
import { RollItem } from './RollItem';
import { speakVietnamese } from './textToSpeech';




function App() {
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

  const handleCacheSetValue = useCallback(
    () => {

    },
    [JSON.stringify(storage)],
  )

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
      dispatch({ type: 'append', payload: rollingNumber });
    },
    [JSON.stringify(storage)],
  )

  const handleNewGame = useCallback(
    () => {
      dispatch({ type: 'reset', payload: 0 });
    },
    [JSON.stringify(storage)],
  )

  return (
      <div className='layout'>
        <div className='main-screen'>
          <div className='rolling-number'>
            {!storage.current?"Đợi bốc số":storage.current}
          </div>
        </div>
        <div className='button-compose'>
          <button onClick={handlRollSet} className='roll-button btn'><i className="animation"></i>Bốc số<i className="animation"></i></button>
          <button onClick={handleNewGame} className=' new-button'>Ván mới</button>
        </div>
        <div className='storage-list'>{
          storage.list.map((item, index) => <RollItem key={index} value={item} />)}</div>
      </div>
  )
}

export default App
