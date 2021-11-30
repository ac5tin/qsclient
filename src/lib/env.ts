export const API_URL: string = process.env.NODE_ENV === "production" ? process.env.API_URL : import.meta.env.VITE_API_URL as string;