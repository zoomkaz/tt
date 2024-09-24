import React from 'react'
import styles from './Header.module.scss'
import Container from '../../UI/container/Container'

const Header = () => {
  return (
    <div className={styles.header} id='header'>
      <Container>
        <div className={styles.content}>
          TEST TASK
        </div>
      </Container>
    </div>
  )
}

export default Header