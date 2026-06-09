
import { serverFetch } from "../cors/server"
import { getUserSession } from "../cors/session"

export const getRecruiterCompany = async(recruiterId) =>{
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
}

// loggedin User

export const  getLoggedInRecruiterCompany  = async () =>{
  const user = await getUserSession();
  return getRecruiterCompany(user?.id)
}