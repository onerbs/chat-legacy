import React from 'react'

type props = {
  name: string
  onClick?(event: any): void
}
export function Icon({name, onClick}: props) {
  return <i className="material-icons"  onClick={onClick}>{name}</i>
}
