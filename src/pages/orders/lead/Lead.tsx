import React, { useState } from 'react'
import styles from './Lead.module.scss'
import { ILead } from '../../../types/types'
import { GetLeadData } from '../../../services/Leads';
import { RotatingLines } from 'react-loader-spinner';

interface LeadPropsType {
  lead: ILead;
  activeId: number;
  setActiveId: (param: number) => void;
}

const Lead = ({ lead, activeId, setActiveId }: LeadPropsType) => {
  const [loading, setLoading] = useState(false)
  const [leadData, setLeadData] = useState<ILead | null>(null)

  const [date, setDate] = useState<string | null>(null)
  const [status, setStatus] = useState(0)

  const getLeadData = async () => {
    if (activeId !== lead.id) {
      setActiveId(lead.id)
      setLoading(true)
      const data = await GetLeadData(lead.id)
      if (data.status === 200) {
        setLeadData(data.data)

        let tempDate = `${new Date(+data.data.created_at * 1000).getDate().toString().length === 1 ?
          '0' + new Date(+data.data.created_at * 1000).getDate().toString() :
          new Date(+data.data.created_at * 1000).getDate()
          }.${(new Date(+data.data.created_at * 1000).getMonth() + 1).toString().length === 1 ?
            '0' + (new Date(+data.data.created_at * 1000).getMonth() + 1).toString() :
            new Date(+data.data.created_at * 1000).getMonth() + 1
          }.${new Date(+data.data.created_at * 1000).getFullYear()
          }`
        setDate(tempDate);

        let tempStatus = new Date(+data.data.closest_task_at * 1000).getDate() - new Date().getDate();
        setStatus(tempStatus)

        setLoading(false)
      }
      // console.log(data);
    } else {
      setActiveId(0)
    }
  }

  const red = <svg
    viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg"
    stroke="red"
    fill="red">
    <circle cx="150" cy="50" r="50" />
  </svg>
  const green = <svg
    viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg"
    stroke="green"
    fill="green">
    <circle cx="150" cy="50" r="50" />
  </svg>
  const yellow = <svg
    viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg"
    stroke="orange"
    fill="orange">
    <circle cx="150" cy="50" r="50" />
  </svg>

  return (
    <div className={styles.lead} onClick={getLeadData}>
      {
        loading ?
          <RotatingLines
            visible={true}
            //@ts-ignore
            height="76"
            width="76"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          :
          activeId === lead.id ?
            <div className={styles.opened}>
              <p>ID: {lead.id}</p>
              <p>Название: {lead.name}</p>
              <p>Бюджет: {lead.price} ₽</p>
              <p>Дата: {date ?? ''}</p>
              <p className={styles.svg}>{status < 0 ? red : status === 0 ? green : yellow}</p>
            </div>
            :
            <div className={styles.closed}>
              <p>ID: {lead.id}</p>
              <p>Название: {lead.name}</p>
              <p>Бюджет: {lead.price} ₽</p>
            </div>
      }
    </div>
  )
}

export default Lead