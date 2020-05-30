import React from 'react'
import { avatar } from "../lib/avatar"

type props = {
  alt?: string,
  hash?: string,
  size: number
}
export default function Avatar({alt = 'Avatar', hash, size}: props) {
  return (
    <img alt={alt} src={avatar(hash)}
      style={{
        borderRadius: "50%",
        minHeight: `${size}px`,
        maxHeight: `${size}px`,
        minWidth:  `${size}px`,
        maxWidth:  `${size}px`
      }}
    />
  )
}
