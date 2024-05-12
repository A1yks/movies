export function getReleaseYears() {
    const currentYear = new Date().getFullYear();
    const startYear = 1896;

    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
        return (currentYear - index).toString();
    });

    return years;
}
