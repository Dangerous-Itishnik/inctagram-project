// 'use client'
// import { ReactNode, useEffect, useState } from 'react'

// import { useUpdateTokensMutation } from '@/service/auth'
// import { useRouter } from 'next/navigation'

// export const Auth = ({ children }: { children: ReactNode }) => {
//   const router = useRouter()
//   const [loading, setLoading] = useState(true)
//   // const [updateTokens] = useUpdateTokensMutation()

//   useEffect(() => {
//     // updateTokens()
//     const token = localStorage.getItem('authToken')

//     if (!token) {
//       router.push('/signIn')
//     }
//     //TODO для того что бы не показывалась страница если ты не авторизован

//     setLoading(false)
//   }, [router])

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return <>{children}</>
// }
