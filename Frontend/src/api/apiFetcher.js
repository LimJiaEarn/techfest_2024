//Utility for making HTTP requests
export const apiFetcher = async (
  url,
  method = "GET", //Default to GET
  body = null,
  options = {},
) => {
  const baseUrl = "/api"; //API base URL
  const fullUrl = `${baseUrl}${url}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, //JWT token retrieval
    ...options.headers,
  };

  const config = {
    method,
    headers,
    ...options,
  };

  //If the method is POST or PUT, there is a body, so we stringify it
  if (body && (method === "POST" || method === "PUT")) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, config);

  if (!response.ok) {
    //Handle HTTP errors
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};
