import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import YouTube from 'react-youtube'

const YouTubeVideo = ({ id }) => {
  const [player, setPlayer] = useState({})
  const [video, setVideo] = useState({})

  const loadVideo = () => {
    const player = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
      events: {
        onReady: onPlayerReady,
        onStateChange: onStateChange,
      },
    })

    setPlayer(player)
  }

  const onPlayerReady = async event => {
    event.target.playVideo()
    await getVideo().then(video => setVideo(video))
  }

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'

      window.onYouTubeIframeAPIReady = loadVideo

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      loadVideo()
    }
  }, [])

  const onStateChange = async event => {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        await updateVideoPlaying(true)
        break
      case YT.PlayerState.PAUSED:
        await updateVideoPlaying(false)
        break
    }
  }

  const updateVideoPlaying = async isPlaying => {
    console.log(video)
  }

  const getVideo = async () => {
    let { data: videos, error } = await supabase.from('video').select('*')
    const video = videos[0]
    return video
  }

  return (
    <div>
      <div id={`youtube-player-${id}`} />
    </div>
  )
}

export default YouTubeVideo
