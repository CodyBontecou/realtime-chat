import { useEffect, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { supabase } from '../utils/supabase'

const YoutubeVideo = () => {
  const [video, setVideo] = useState(null)

  const getVideo = async () => {
    let { data: videos, error } = await supabase.from('video').select('*')
    if (videos) {
      const video = videos[0]
      return video
    }
    return error
  }
  const updateVideoPlaying = async (isPlaying, currentTime) => {
    await supabase
      .from('video')
      .update({ playing: isPlaying, current_time: currentTime })
      .eq('id', video.id)
  }
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    event.target.seekTo(video.current_time)
    event.target.playVideo()
  }

  const onPause: YouTubeProps['onPause'] = async event => {
    await updateVideoPlaying(false, event.target.getCurrentTime())
  }

  const onPlay: YouTubeProps['onPlay'] = async event => {
    await updateVideoPlaying(true, event.target.getCurrentTime())
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  useEffect(() => {
    getVideo().then(video => setVideo(video))
  })

  return (
    <YouTube
      videoId="2g811Eo7K8U"
      opts={opts}
      onReady={onPlayerReady}
      onPause={onPause}
      onPlay={onPlay}
    />
  )
}

export default YoutubeVideo
