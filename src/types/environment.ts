declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TMDB_TOKEN: string;
        }
    }
}

export {};
