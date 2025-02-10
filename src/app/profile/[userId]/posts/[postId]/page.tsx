'use client'
import { RequireAuth } from '@/common/components/requireAuth/RequireAuth'
import PostContentModal from "@/common/components/Modals/PostModal/PostContentModal";

function  Post() {
  return <div>
    <PostContentModal/>
  </div>
}

export default function EditProfileProtected() {
  return (
    <RequireAuth>
      <Post/>
    </RequireAuth>
  )
}
