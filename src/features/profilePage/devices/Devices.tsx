'use client'

import React from 'react'

import { useParams } from 'next/navigation'

const Devices: React.FC = () => {
  const params = useParams()
  const userId = Number(params.userId)

  return (
    <div>
      <h2>Connected Devices</h2>
      <p>Manage your connected devices for user ID: {userId}</p>
    </div>
  )
}

export default Devices
