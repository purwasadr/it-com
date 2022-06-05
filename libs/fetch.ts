interface FetchInit {
    headers?: HeadersInit | undefined,
    body?: BodyInit | null | undefined
}

function doFetch(url: string, method: string, init: FetchInit = { headers: {}, body: null }) {
    const { headers, body } = init;
    
    return fetch(url, {
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });
}

export function fetchPost(url: string, init?: FetchInit) {
    return doFetch(url, 'POST', init);
}

export function fetchGet(url: string, init?: FetchInit) {
    return doFetch(url, 'GET', init);
}