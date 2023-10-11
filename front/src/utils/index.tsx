export const dateFormat = (datetime : string) => {
    const date = new Date(datetime);
    date.setHours(date.getHours() - 9);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}