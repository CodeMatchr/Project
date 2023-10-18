// Input Icon //
export enum INPUT_ICON {
    ON = 'on',
    OFF = 'off',
    ADDRESS = 'address'
};

// 회원가입시 패턴 에러 //
export const emailPattern = /^[A-Za-z0-9]*@([-.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
export const telNumberPattern = /^[0-9]{10,11}$/;
export const emailBlanck = /\s/g;

// Navigator

// Main
export const MAIN_PATH = '/';
// Authentication
export const AUTHENTICATION_PATH = '/authentication';
// Board
export const BOARD_PATH = '/board';
export const UPDATE_PATH = (boardNumber : number | string) => `/update/${boardNumber}`;
export const BOARD_UPDATE_PATH = (boardNumber : number | string) => `${BOARD_PATH}/${UPDATE_PATH(boardNumber)}`;

export const DETAIL_PATH = (boardNumber : number | string) => `detail/${boardNumber}`;
export const BOARD_DETAIL_PATH = (boardNumber : number | string) => `${BOARD_PATH}/${DETAIL_PATH(boardNumber)}`;

export const WRITE_PATH = '/write';
export const BOARD_WRITE_PATH = () => `${BOARD_PATH}/${WRITE_PATH}}`;


export const BOARD_NUMBER_PATH_VARIABLE = ':boardNumber';

// User
export const USER_PATH = (userEmail:string) => `/user/${userEmail}`;
export const USER_PAGE_PATH_VARIABLE = ':userEmail';


// Room | Chat
export const ROOM_PATH = '/room';
export const ROOM_DETAIL_PATH = (roomNumber : number | string) => `detail/${roomNumber}`;
export const ROOM_LIST_PATH = (roomNumber : number | string) => `${ROOM_PATH}/${ROOM_DETAIL_PATH(roomNumber)}`;

export const ROOM_NUMBER_PATH_VARIABLE = ':roomNumber';

// Compare
export const COMPARE_PATH = '/compare';

// Friend 

// Pop Up
export const POPUP_PATH = '/pop-up';
export const POPUP_COME_PATH = '/pop-up/come';
export const POPUP_ROOM_PATH = '/pop-up/room';
export const POPUP_MANAGER_NAME_PATH = '/pop-up/name';
export const POPUP_MANAGER_PASSWORD_PATH = '/pop-up/password';
export const POPUP_MANAGER_IMAGE_PATH = '/pop-up/image';
export const POPUP_MANAGER_BYE_PATH = '/pop-up/bye';

export const POPUP_BOARD_PATH = '/pop-up/board';

export const USER_ITEM_PATH = '/user/item';

// Main - chat(room) pagination //
export const MAIN_ROOM_COUNT_BY_PAGE = 3;
export const MAIN_ROOM_COUNT_BY_PAGE_FUll = 5;

// MyPage - Compare result pagination //
export const MY_COMPARE_RESULT_BY_PAGE = 1;

export const MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION = 5;
export const COUNT_BY_MAIN_ROOM_SECTION = MAIN_ROOM_COUNT_BY_PAGE * MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION;

// Chat
export const CHAT_PATH = '/chat';


// Board -detail pagination //
export const COUNT_BY_PAGE = 5;
export const COUNT_BY_PAGE_COMMENT = 3;
export const PAGE_BY_SECTION = 10;
export const COUNT_BY_SECTION = COUNT_BY_PAGE * PAGE_BY_SECTION;
export const COUNT_BY_SECTION_COMMENT = COUNT_BY_PAGE_COMMENT * PAGE_BY_SECTION;