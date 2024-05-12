export function deleteQueryParams(names: string[], search?: string) {
    const params = new URLSearchParams(search ?? window.location.search);

    names.forEach((name) => params.delete(name));

    return params.toString();
}
