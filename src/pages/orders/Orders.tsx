import React, { useCallback, useEffect, useState } from 'react'
import styles from './Orders.module.scss'
import { GetLeads } from '../../services/Leads'
import { ILead } from '../../types/types'
import Lead from './lead/Lead'
import { MagnifyingGlass } from 'react-loader-spinner'

const Orders = () => {
  const [orders, setOrders] = useState<ILead[]>([])
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const getLeads = useCallback(async (page: number) => {
    const data = await GetLeads(page);
    // console.log(data);
    if (data.status === 200) {
      let tempOrders = data.data._embedded.leads;
      let tempNextPage = data.data._links.next?.href.split('page=')[1].split('&')[0];
      let tempPage = data.data._links.self?.href.split('page=')[1].split('&')[0];
      setOrders([...orders, ...tempOrders])
      setPage(tempPage)
      setNextPage(tempNextPage)
      setLoading(false)
    }
  }
    , [orders])

  useEffect(() => {
    if (nextPage) {
      const intervalID = setInterval(() => {
        getLeads(nextPage)
      }, 1100);
      return () => clearInterval(intervalID);
    }
  }, [getLeads, nextPage, page])

  const [activeId, setActiveId] = useState(0)

  return (
    <div className={loading ? styles.ordersLoading : styles.orders}>
      {
        loading ?
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
          :
          orders.map((lead, index) => <Lead lead={lead} activeId={activeId} setActiveId={setActiveId} key={index} />)
      }
    </div>
  )
}

export default Orders