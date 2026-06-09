
import { serverFetch } from "../cors/server"

export const getRecruiterCompany = async(recruiterId) =>{
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
}