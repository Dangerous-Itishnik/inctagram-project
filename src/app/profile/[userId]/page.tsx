'use client'

import ImagePostLists from "@/common/components/ImagePost/ImagePostLists";
import { Header } from "@/common/components/Header/Header";
import { useState } from "react";

export default function Profile() {


  return (
    <div>
      <h1>Profile Page</h1>
      <ImagePostLists/>
    </div>
  )
}
