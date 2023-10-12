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
// User
export const USER_PATH = '/user';
// Room
export const ROOM_PATH = '/room';
// Compare
export const COMPARE_PATH = '/compare';

// Friend 

// Pop Up
export const POPUP_PATH = '/pop-up';
export const POPUP_ROOM_PATH = '/pop-up/room';
export const POPUP_MANAGER_PATH = '/pop-up/manager';

// Main - chat(room) pagination //
export const MAIN_ROOM_COUNT_BY_PAGE = 3;
export const MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION = 5;
export const COUNT_BY_MAIN_ROOM_SECTION = MAIN_ROOM_COUNT_BY_PAGE * MAIN_ROOM_COUNT_BY_PAGE_BY_SECTION;

