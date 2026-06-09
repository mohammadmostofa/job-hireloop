import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/cors/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const companyPage = async () => {
  const user = await getUserSession() ;
  const company = await getRecruiterCompany (user?.id) ;
  console.log(user, "user")
  return (
    <div>
         <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default companyPage;