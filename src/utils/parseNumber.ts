export function parseNumber(value: string | null | undefined, defaultValue: number) {
    return parseInt(value || defaultValue.toString()) || defaultValue;
}
