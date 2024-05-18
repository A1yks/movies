import { getMoviesSchema } from '@/api/validation';
import { getSearchParams, getUrlInfo, deleteQueryParams } from './';
import { RedirectType, redirect } from 'next/navigation';

export async function validateSearchParams(searchParams?: Record<string, string>) {
    const params = searchParams || getSearchParams();
    const { pathname, qs } = getUrlInfo();
    const { success, error } = await getMoviesSchema.safeParseAsync(params);

    const badFields = error?.errors.map((error) => error.path[0].toString()) || [];
    const updatedQs = deleteQueryParams(badFields, qs);
    const redirectTo = updatedQs === '' ? pathname : `${pathname}?${updatedQs}`;

    if (!success) {
        return redirect(redirectTo, RedirectType.replace);
    }

    return { pathname, qs };
}
