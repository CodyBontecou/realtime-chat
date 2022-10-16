import { useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { supabase } from '../utils/supabase'

const YoutubeVideo = ({ className }) => {
  const playerRef = useRef<YouTube | null>(null)
  const [video, setVideo] = useState(null)

  // getPlayer returns any
  const getPlayer = () => {
    if (playerRef && playerRef.current) {
      return playerRef.current.getInternalPlayer()
    }

    return null
  }

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
    event.target.seekTo(video?.current_time)
    event.target.playVideo()

    playerRef.current = event.target
  }

  const onPause: YouTubeProps['onPause'] = async event => {
    await updateVideoPlaying(false, event.target.getCurrentTime())
  }

  const onPlay: YouTubeProps['onPlay'] = async event => {
    await updateVideoPlaying(true, event.target.getCurrentTime())
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  useEffect(() => {
    // const player = getPlayer()
    getVideo().then(video => setVideo(video))

    const setupVideoSubscription = async () => {
      await supabase
        .from('video')
        .on('UPDATE', payload => {
          console.log('Change received!', payload)
          if (payload.new.playing) {
            console.log(playerRef.current)
            // @ts-ignore
            playerRef.current.playVideo()
          } else if (!payload.new.playing) {
            // @ts-ignore
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
      videoId="2g811Eo7K8U"
      opts={opts}
      onReady={onPlayerReady}
      onPause={onPause}
      onPlay={onPlay}
    />
  )
}

export default YoutubeVideo
