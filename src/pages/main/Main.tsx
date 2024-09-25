import React from 'react'
import styles from './Main.module.scss'
import Container from '../../UI/container/Container'
import NavSide from '../../components/navSide/NavSide'
import Orders from '../orders/Orders'

const Main = () => {
  return (
    <div className={styles.main}>
      <Container className={styles.height}>
        <div className={styles.content}>
          <div className={styles.left} id='left'>
            <NavSide />
          </div>
          <div className={styles.right}>
            <Orders />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Main