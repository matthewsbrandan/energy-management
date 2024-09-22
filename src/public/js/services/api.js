const api = {
  post: async (url, fields, options) => {
    let headers = { 'Content-Type': 'application/json' };

    if(options?.headers) headers = { ...headers, ...options.headers };

    const data = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(fields)
    }).then((response) => response.json())

    return { data }
  },
  get: async (url, options) => {
    let headers = { 'Content-Type': 'application/json' };

    if(options?.headers) headers = { ...headers, ...options.headers };
    
    const data = await fetch(url, {
      method: 'GET',
      headers
    }).then((response) => response.json())

    return { data }
  }
}