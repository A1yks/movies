export function createQueryString(name: string, value: string, search?: string) {
    const params = new URLSearchParams(search ?? window.location.search);

    params.set(name, value);

    return params.toString();
}
