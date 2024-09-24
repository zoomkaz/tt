import React, { useEffect, useState } from 'react'
import styles from './Main.module.scss'
import Container from '../../UI/container/Container'
import NavSide from '../../components/navSide/NavSide'
import { Route, Routes } from 'react-router-dom'
import Orders from '../orders/Orders'
import Error from '../error/Error'

const Main = () => {
  const [currentHeight, setCurrentHeight] = useState(0);

  const getCurrentHeight = () => {
    const header = document.getElementById('header') || document.createElement('div');
    const bodyHeight = document.body.scrollHeight;
    const res = bodyHeight - header.scrollHeight;
    setCurrentHeight(res);
  }

  useEffect(() => {
    getCurrentHeight()
  }, [])

  return (
    <div className={styles.main}
    // style={{ height: `${currentHeight}px` }}
    >
      <Container className={styles.height}>
        <div className={styles.content}>
          <div className={styles.left}>
            <NavSide />
          </div>
          <div className={styles.right}>
            <Routes>
              <Route path='/orders' element={<Orders />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Main