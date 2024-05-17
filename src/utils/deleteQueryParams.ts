export function deleteQueryParams<Keys extends string = string>(names: Keys[], search?: string) {
    const params = new URLSearchParams(search ?? window.location.search);

    names.forEach((name) => params.delete(name));

    return params.toString();
}
