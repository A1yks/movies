declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SITE_NAME: string;
            TMDB_TOKEN: string;
        }
    }
}

export {};
