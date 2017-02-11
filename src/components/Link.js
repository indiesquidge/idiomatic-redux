import React from 'react'

const Link = ({
  active,
  onClick,
  children
}) => {
  return active ? (
    <span>{children}</span>
  ) : (
    <a href='#' onClick={e => {
      e.preventDefault()
      onClick()
    }}>
      {children}
    </a>
  )
}

export default Link
