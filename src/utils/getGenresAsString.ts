export function getGenresAsString(genres: Map<number, string>, ids: number[], limit = ids.length) {
    return ids
        .slice(0, limit)
        .map((id) => genres.get(id))
        .filter((g): g is string => g !== undefined);
}
