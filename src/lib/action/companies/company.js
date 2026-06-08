"use server";

import { serverMutation } from "@/lib/cors/server";

 export const CreateCompany = async(newCompanyData) => {
  return await serverMutation('/api/companies' , newCompanyData)
}