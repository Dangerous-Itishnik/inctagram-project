import { ChangeEvent, useState } from 'react'

import { Textarea } from '@/common/components/Textarea/Textarea'
import { Button } from '@/common/components/button'
import { useSendMessageMutation } from '@/service/messenger/messenger.service'

import styles from './sendMessage.module.scss'

const SendMessage = ({ receiverId, refetch }: { receiverId: number; refetch: () => void }) => {
  const [value, setValue] = useState<string>('')
  const [sendMessage] = useSendMessageMutation()

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const sendHandler = async () => {
    if (!value.trim()) {
      return
    }

    try {
      await sendMessage({ message: value.trim(), receiverId }).unwrap()
      setValue('')
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.send}>
      <Textarea
        className={styles.textArea}
        label={''}
        maxLength={300}
        minLength={1}
        onChange={onChangeHandler}
        placeholder={'Send a message...'}
        value={value}
        style={{ width: '500px', border: 'none' }}
      />
      <Button onClick={sendHandler}>Send</Button>
    </div>
  )
}

export default SendMessage
