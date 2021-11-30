export interface apiResponse {
    ok: boolean,
    error?: string,
}

export interface qInput {
    query: string,
    limit: number,
    offset: number,
    lang: string,
    score_details: boolean,
}

export interface post {
    author: string,
    site: string,
    title: string,
    summary: string,
    url: string,
    timestamp: number,
    language: string,
}

export interface qResponse extends apiResponse {
    posts: post[],
}