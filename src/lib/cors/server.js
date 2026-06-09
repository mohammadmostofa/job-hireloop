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





// get dat from backend 
export const serverFetch = async (path, params = {}) => {
  try {
    const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
    const sanitizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    // URL এর সাথে query params যোগ করা
    const url = new URL(`${sanitizedBaseUrl}${sanitizedPath}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const res = await fetch(url.toString(), {
      method: 'GET', // মেথড GET
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in serverFetchGet:", error);
    return { success: false, error: error.message };
  }
};



