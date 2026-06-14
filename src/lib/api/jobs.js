"use server"

import { serverFetch } from "../cors/server";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getCompanyJobs = async(companyId, status = 'active') =>{
 const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
   return res.json()
}


// get job data to details page
 export const getJob = async () =>{
  return serverFetch('/app.jobs')

}
export const getJobById = async(jobId)=>{
  return serverFetch(`/api/jobs/${jobId}`) 
}