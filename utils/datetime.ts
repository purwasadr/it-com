export const getDateShort = (dateString?: string) => {
    if (!dateString) return undefined;

    const date = new Date(dateString);

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};
