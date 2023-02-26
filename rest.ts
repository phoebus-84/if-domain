const signedFetch = async (url: string, request: any) => {
    const requestJSON = JSON.stringify(request);
    const requestHeaders = {"zenflows-id":process.env.ZENFLOWS_ID!, "Content-Type": "application/json"}
    return await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(request),
    });
  };

  export default signedFetch;