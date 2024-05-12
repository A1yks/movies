declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_URL: string;
            TMDB_TOKEN: string;
        }
    }
}

export {};
