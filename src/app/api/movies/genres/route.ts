import { NextResponse } from 'next/server';
import { api } from '../config';

export async function GET() {
    const genres = await api.get('/genre/movie/list', {
        params: { language: 'en' },
    });

    return NextResponse.json(genres.data);
}
