import { MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION } from "../constants";

export const dateFormat = (datetime : string) => {
    const date = new Date(datetime);
    date.setHours(date.getHours() - 9);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

export const getPagination = (roomCount : number, currentSection : number, countByPage : number) => {
    const section = Math.ceil(roomCount / (MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION * countByPage));
    const totalPageCount = Math.ceil(roomCount / countByPage);

    const maxPage = totalPageCount >= currentSection * MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION ?
        currentSection * MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION : totalPageCount;
    const minPage = 5 * (currentSection - 1) + 1;

    return {section, totalPageCount, maxPage, minPage};
}