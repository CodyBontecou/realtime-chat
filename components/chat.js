import { useEffect, useState, useRef } from 'react'
import { supabase } from '../utils/supabase'
import { useUser } from '../context/user'

const Chat = () => {
  const { user, isLoading } = useUser()
  const [messages, setMessages] = useState()
  const [loading, setLoading] = useState(true)
  const message = useRef('')
  let counter = 0

  useEffect(() => {
    const getMessages = async () => {
      let { data: messages, error } = await supabase.from('message').select('*')

      setMessages(messages)
      setLoading(false)
    }

    getMessages()

    const setupMessagesSubscriptions = async () => {
      await supabase
        .from('message')
        .on('INSERT', payload => {
          console.log('Insert received!', payload)
          setMessages(previous => [].concat(previous, payload.new))
        })
        .on('UPDATE', payload => {
          console.log('Update received!', payload)
        })
        .subscribe()
    }

    setupMessagesSubscriptions()
  }, [])

  const sendMessage = async event => {
    event.preventDefault()
    console.log(user.id)

    const content = message.current.value
    await supabase.from('message').insert([{ content, user_id: user.id }])

    message.current.value = ''
  }

  const updateTimestamp = async event => {
    event.preventDefault()

    console.log('updating timestamp')

    counter += 5
    console.log(counter)
  }

  return (
    <div>
      {!loading &&
        messages.map(message => <div key={message.id}>{message.content}</div>)}

      <form onSubmit={sendMessage}>
        <input placeholder="Write your message" required ref={message}></input>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={updateTimestamp}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Chat
