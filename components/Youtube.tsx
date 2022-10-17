import { useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'

import { useUser } from '../context/user'
import { supabase } from '../utils/supabase'

const YoutubeVideo = ({ className }) => {
  const { user } = useUser()
  const playerRef = useRef<YouTubePlayer | null>(null)
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
    playerRef.current = event.target

    event.target.seekTo(video?.current_time)
    event.target.playVideo()
  }

  const rlsUser = user?.id === video?.user

  const onPause: YouTubeProps['onPause'] = async event => {
    if (rlsUser) {
      await updateVideoPlaying(false, event.target.getCurrentTime())
    }
  }

  const onPlay: YouTubeProps['onPlay'] = async event => {
    if (rlsUser) {
      await updateVideoPlaying(true, event.target.getCurrentTime())
    }
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      modestbranding: true,
    },
  }

  const videoIsPlaying = payload =>
    payload.new.playing &&
    playerRef.current.getPlayerState() !== YouTube.PlayerState.PLAYING

  const videoIsPaused = payload =>
    !payload.new.playing &&
    playerRef.current.getPlayerState() !== YouTube.PlayerState.PAUSED

  useEffect(() => {
    // const player = getPlayer()
    getVideo().then(video => setVideo(video))

    const setupVideoSubscription = async () => {
      await supabase
        .from('video')
        .on('UPDATE', payload => {
          if (videoIsPlaying(payload)) {
            playerRef.current.seekTo(payload.new.current_time)
            playerRef.current.playVideo()
          } else if (videoIsPaused(payload)) {
            playerRef.current.pauseVideo()
          }
        })
        .subscribe()
    }

    setupVideoSubscription()
  }, [])

  return (
    <YouTube
      className={className}
      videoId="VOd28z9d-JU"
      opts={opts}
      onReady={onPlayerReady}
      onPause={onPause}
      onPlay={onPlay}
    />
  )
}

export default YoutubeVideo
