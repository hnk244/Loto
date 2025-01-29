import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
type TYoutubeEmbedProps = {
  videoId: string
}
const YoutubeEmbed: React.FC<TYoutubeEmbedProps> = ({ videoId }) => {
  const [playing, setPlaying] = React.useState(false)
  useEffect(() => {
    if (playing) {
      setPlaying(false)
    }
  }, [videoId])

  const handleVideoPlay = () => {
    if (playing) {
      setPlaying(false)
    } else {
      setPlaying(true)
    }
  }
  return (
    <div >
      <ReactPlayer style={{ display: 'none', }} url={`https://www.youtube.com/watch?v=${videoId}`} loop={true} width='0' height='0' playing={playing} />
      <button onClick={handleVideoPlay} className='new-button' style={{ background: "gray", color: "white", width: "150px" }} >{
        playing ? 'Pause music ||' : 'Play music ▷'}</button>
    </div>

  )
}

export default YoutubeEmbed
