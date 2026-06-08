"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// রিইউজেবল গ্লোবাল সার্ভার মিউটেশন ফাংশন
export const serverMutation = async (path, data) => {
  try {
    const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
    const sanitizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    const res = await fetch(`${sanitizedBaseUrl}${sanitizedPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in serverMutation Action:", error);
    return { success: false, error: error.message };
  }
};

// কোম্পানি তৈরি করার সুনির্দিষ্ট অ্যাকশন
export const CreateCompany = async (newCompanyData) => {
  return await serverMutation('/api/companies', newCompanyData);
};