import React, { useCallback, useEffect, useState } from 'react'
import styles from './NavSide.module.scss'

const navs = ['Сделки', 'Предложения', 'Таблица']

const NavSide = () => {
  const currentPath = window.location.pathname;

  const [active, setActive] = useState(currentPath === '/orders' ? 0 : currentPath === '/ways' ? 1 : 2)

  const choseRedirect = useCallback(() => {
    if (navs[active] === 'Сделки' && window.location.pathname !== '/orders') {
      document.location.href = '/orders'
    } else if (navs[active] === 'Предложения' && window.location.pathname !== '/ways') {
      document.location.href = '/ways'
    } else if (navs[active] === 'Таблица' && window.location.pathname !== '/table') {
      document.location.href = '/table'
    }
  }
    , [active])

  useEffect(() => {
    choseRedirect()
  }, [choseRedirect])

  return (
    <div className={styles.navs}>
      {
        navs.map((nav, index) => {
          return <div
            className={active === index ? styles.activeNav : styles.nav}
            key={index}
            onClick={() => active !== index ? setActive(index) : <></>}
          >
            {nav}
          </div>
        })
      }
    </div>
  )
}

export default NavSide