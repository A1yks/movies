export function formatDate(date: string) {
    const [year, month, day] = date.split('-');
    const monthName = new Date(date).toLocaleString('en', { month: 'long' });

    return ` ${monthName} ${day}, ${year}`;
}
