import React, { useState } from 'react'
import styles from './NavSide.module.scss'
import InnerHTML from 'dangerously-set-html-content'

const navs = ['Сделки', 'Предложения', 'Таблица']

const NavSide = () => {
  const [active, setActive] = useState(0)

  //@ts-ignore
  const btn = `<script class="amocrm_oauth" charset="utf-8" data-client-id="919cab84-8f30-49fa-8393-54b78ac51749"
    data-title="Авторизоваться" data-compact="false" data-class-name="amoBtn" data-color="default" data-state="state"
    data-error-callback="functionName" data-mode="popup" src="https://www.amocrm.ru/auth/button.min.js"></script>`

  const logout = () => {
    localStorage.clear();
    document.location.href = '/tt/'
  }

  return (
    <div className={styles.navs} id='navs'>
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
      <div className={styles.btns}>
        <InnerHTML html={btn} />
        <p className={styles.logout} onClick={logout}>Выход</p>
      </div>
    </div>
  )
}

export default NavSide