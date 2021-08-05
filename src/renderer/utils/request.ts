interface RequestConfig extends RequestInit {
  url: string;
  data?: any;
  cache?: RequestCache
}

function requestBase({ url, cache, headers, data, method }: RequestConfig) {
  return fetch(url, {
    cache: cache ?? "default",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      'content-type': 'application/json',
      ...headers
    },
    method: method ?? "GET",
    mode: "cors",
    redirect: "follow",
    referrer: "client",
  }).then(response => response.json())
}

export default requestBase;
