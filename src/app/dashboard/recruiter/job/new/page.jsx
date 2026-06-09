import React from 'react';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import PostJobForm from './postJobForm';

const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany()
  return (
    <div>
        <PostJobForm company={company} />
    </div>
  );
};

export default PostJobPage;