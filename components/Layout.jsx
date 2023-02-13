import React from 'react'
import styles from "src/styles/layout.module.css"

export const Layout = ({children}) => {
  return (
    <div className={styles.container}>{children}</div>
  )
}
