import React, { useCallback, useEffect, useState } from 'react'
import styles from './App.module.scss'
import Header from '../header/Header'
import Main from '../../pages/main/Main'
import { AuthMethod } from '../../services/Auth'
import InnerHTML from 'dangerously-set-html-content'

const App = () => {
  const [isCheck, setisCheck] = useState(false)

  const getAccess = async (id: string, code: string) => {
    const data = await AuthMethod(id, code)
    if (data.status === 200) {
      localStorage.setItem("access_token", data.data.access_token)
      localStorage.setItem("refresh_token", data.data.refresh_token)
      localStorage.setItem("expires_in", data.data.expires_in)
      document.location.href = '/tt/'
    } else {
      alert('Что-то пошло не так.. (Предположительно ошибка CORS). Попробуйте снова')
      document.location.href = '/tt/'
      // console.log(data);
    }
  }

  const checkData = useCallback(() => {
    const rowData = window.location.search;
    if (rowData) {
      const code = rowData.split('=')[1].split('&')[0];
      const id = rowData.split('client_id=')[1];
      getAccess(id, code)
    } else {
      const access = localStorage.getItem("access_token");
      if (access) {
        setisCheck(true)
      }
    }
  }
    , [])

  useEffect(() => {
    checkData()
  }, [checkData])

  //@ts-ignore
  const btn = `<script class="amocrm_oauth" charset="utf-8" data-client-id="919cab84-8f30-49fa-8393-54b78ac51749"
  data-title="Авторизоваться" data-compact="false" data-class-name="amoBtn" data-color="default" data-state="state"
  data-error-callback="functionName" data-mode="popup" src="https://www.amocrm.ru/auth/button.min.js"></script>`

  return (
    <>
      {
        isCheck ?
          <div className={styles.app}>
            <Header />
            <Main />
          </div>
          :
          <div className={styles.app}
            style={
              { fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }
            }
            id='app'
          >
            <p>Авторизируйтесь по кнопке ниже</p>
            <p>↓</p>
            <InnerHTML html={btn} />
          </div>
      }
    </>
  )
}

export default App