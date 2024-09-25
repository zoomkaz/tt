import { ApiClient } from "./Client"

export const GetLeads = async (page: number) => {
  return await ApiClient({
    url: '/api/v4/leads',
    params: {
      page: page,
      limit: 3
    }
  })
}

export const GetLeadData = async (id: number) => {
  return await ApiClient({
    url: `/api/v4/leads/${id}`
  })
}