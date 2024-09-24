import React, { useEffect, useState } from 'react'
import styles from './App.module.scss'
import Header from '../header/Header'
import Main from '../../pages/main/Main'

const App = () => {

  const [wsData, setWsData] = useState<any>()

  const handleWebSocket = () => {
    const newSocket = new WebSocket("ws://localhost:8080/ws");
    newSocket.onopen = () => console.log('WS Connected');
    newSocket.onclose = () => console.log('WS Disconnected');
    newSocket.onerror = (err) => console.log("WS Error");
    newSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("WS Receives: ", data);
    }
  }

  useEffect(() => {
    handleWebSocket();
  }, []);

  return (
    <>
      {
        wsData ?
          <div className={styles.app}>
            <Header />
            <Main />
          </div>
          :
          <div className={styles.app}
            style={
              { fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }
            }
          >
            <p>Авторизируйтесь по кнопке ниже</p>
            <p>↓</p>
          </div>
      }
    </>
  )
}

export default App