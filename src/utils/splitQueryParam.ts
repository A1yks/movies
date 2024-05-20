export function splitQueryParam(qs: string | null | undefined, separator: string) {
    if (!qs) {
        return [];
    }

    return qs.split(separator);
}
