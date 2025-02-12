// components/TextWithShowMore.tsx
import React, { useState } from 'react'

import styles from './TextWithShowMore.module.scss'

interface TextWithShowMoreProps {
  text: string
}

export const TextWithShowMore: React.FC<TextWithShowMoreProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleText = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles.textContainer}>
      <p className={`${styles.text} ${isExpanded ? styles.textExpanded : ''}`}>{text}</p>
      {text.split('\n').length > 3 && (
        <button className={styles.showMoreButton} onClick={toggleText}>
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}
