/**
 * =================================
 * API Client
 *
 *
 * =================================
 */

import { privateAxios } from "@/config/axios.config";
import { API_BASE } from "@/constants";

// Helper function for making authenticated requests
async function apiRequest<T>(
  endpoint: string,
  options: {
    body?: any;
    method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
  }
): Promise<T | null> {
  const url = `${API_BASE}${endpoint}`;

  switch (options.method) {
    case "GET":
      try {
        const response = await privateAxios.get<any | null>(
          url,
          options.body ?? {}
        );

        const data = response.data;
        return data;
      } catch (error: Error | any) {
        if (error.response.data) throw new Error(error.response.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "DELETE":
      try {
        const response = await privateAxios.delete<any | null>(
          url,
          options.body ?? {}
        );

        const data = response.data;
        return data;
      } catch (error: Error | any) {
        if (error.response.data) throw new Error(error.response.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "POST":
      try {
        const response = await privateAxios.post<any | null>(
          url,
          options.body ?? {}
        );
        const data = response.data;
        return data;
      } catch (error: Error | any) {
        if (error.response.data) throw new Error(error.response.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "PUT":
      try {
        const response = await privateAxios.put<any | null>(
          url,
          options.body ?? {}
        );
        const data = response.data;
        return data;
      } catch (error: Error | any) {
        if (error.response.data) throw new Error(error.response.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "PATCH":
      try {
        const response = await privateAxios.patch<any | null>(
          url,
          options.body ?? {}
        );
        const data = response.data;
        return data;
      } catch (error: Error | any) {
        if (error.response.data) throw new Error(error.response.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    default:
      console.error("Invalid HTTP method");
      return null;
      break;
  }
}

// API Methods
export const api = {};
