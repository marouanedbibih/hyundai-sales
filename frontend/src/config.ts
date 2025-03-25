export const getApiUrl = () => {
    if (typeof window === 'undefined') {
      return process.env.API_URL;
    } else {
      return process.env.NEXT_PUBLIC_API_URL;
    }
  };
  