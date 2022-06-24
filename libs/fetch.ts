
function doFetch(url: string, method: string, init: RequestInit = { headers: {}, body: null }) {
    const { headers, body } = init;
    
    return fetch(url, {
            ...init,
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });
}
function doFetch2(url: string, method: string, init: RequestInit = { headers: {}, body: null }) {
    const { headers, body } = init;
    
    return new Promise<Response>((resolve, reject) => {
        fetch(url, {
            ...init,
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        }).then((res) => {
            if (!res.ok) reject(res.statusText);
            resolve(res);
        }).catch((reason) => {
            reject(reason)
        });
    });
}

interface ResponseData extends Response {
    data: any
}

function doFetch3(url: string, method: string, init: RequestInit = { headers: {}, body: null }) {
    const { headers, body } = init;
    
    return new Promise<ResponseData>((resolve, reject) => {
        fetch(url, {
            ...init,
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        }).then(async (res) => {
            if (!res.ok) reject(res.statusText);
            return {
                ...res,
                data: await res.json() 
            }
        }).then((res) => {
            resolve(res);
        })
        .catch((reason) => {
            reject(reason)
        });
    });
}

export function fetchPost(url: string, init?: RequestInit) {
    return doFetch2(url, 'POST', init);
}

export function fetchGet(url: string, init?: RequestInit) {
    return doFetch2(url, 'GET', init);
}