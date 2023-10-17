import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from '../interfaces/request/authentication';
import { SignInResponseDto, SignUpResponseDto } from '../interfaces/response/authentication';
import ResponseDto from '../interfaces/response/response.dto';
import GetLoginUserResponseDto from 'src/interfaces/response/User/get-login-user.response.dto';
import { GetUserBoardListResponseDto, GetUserResponseDto, GetUserRoomListResponseDto, PatchNicknameResponseDto, PatchProfileImageUrlResponseDto } from 'src/interfaces/response/User';
import { PatchNicknameRequestDto, PatchProfileImageUrlRequestDto, PatchStateMessageRequestDto } from 'src/interfaces/request/user';
import PatchStateMessageResponseDto from 'src/interfaces/response/User/patch-state-message-response.dto';

const API_DOMAIN = 'http://localhost:4040/api/v1';

// Authentication 관련 //
const SIGN_UP_URL = () => `${API_DOMAIN}/authentication/sign-up`;
const SIGN_IN_URL = () => `${API_DOMAIN}/authentication/sign-in`;

// 로그인 사용자 정보 불러오기 //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
// 사용자 //
const GET_USER_URL = (userEmail: string) => `${API_DOMAIN}/user/${userEmail}`;

// 유저페이지 게시물 리스트 불러오기 //
const GET_USER_BOARD_LIST_URL = (userEmail: string) => `${API_DOMAIN}/user/board-list/${userEmail}`;
// 유저페이지 채팅방 리스트 불러오기 //
const GET_USER_ROOM_LIST_URL = (userEmail: string) => `${API_DOMAIN}/user/room-list/${userEmail}`;

// 닉네임 변경 //
const PATCH_USER_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
// 프로필 이미지 변경 //
const PATCH_USER_PROFILE_URL = () => `${API_DOMAIN}/user/profile`;
// 상태메세지 변경 //
const PATCH_USER_STATE_MESSAGE_URL = () => `${API_DOMAIN}/user/state-message`;

// 로그인 //
export const signInRequest = async (data : SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), data)
        .then((response) => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
        return result;
    }

// 회원가입 //
export const signUpRequest = async (data : SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), data)
        .then((response) => {
            const responseBody: SignUpResponseDto = response.data;
            const {code} = responseBody;
            return code;
        })
        .catch((error) => {
            const responseBody: ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        });
        return result;
}

// 로그인 사용자 //
export const getSignInUserRequest = async (token:string) => {
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };
    const result = await axios.get(GET_SIGN_IN_USER_URL(), headers)
        .then((response) => {
            const responseBody: GetLoginUserResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
        return result;
}

// 사용자 //
export const getUserRequest = async (userEmail:string) => {
    const result = await axios.get(GET_USER_URL(userEmail))
        .then((response) => {
            const responseBody : GetUserResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 닉네임 변경 //
export const patchNicknameRequest = async (data: PatchNicknameRequestDto, token: string) => {
    const result = await axios.patch(PATCH_USER_NICKNAME_URL(), data, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
            const responseBody:PatchNicknameResponseDto = response.data;
            const {code} = responseBody;
            return code;
        })
        .catch((error) => {
            const responseBody:ResponseDto = error.response.data;
            const {code} = responseBody;
            return code; 
        });
    return result;
}

// 프로필 이미지 변경 //
export const patchProfileImageUrlRequest = async (data: PatchProfileImageUrlRequestDto, token:string) => {
    const result = await axios.patch(PATCH_USER_PROFILE_URL(), data, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
            const responseBody:PatchProfileImageUrlResponseDto = response.data;
            const {code} = responseBody;
            return code;
        })
        .catch((error) => {
            const responseBody:ResponseDto = error.response.data;
            const {code} = responseBody;
            return code;
        });
    return result;
}

// 상태메세지 변경 //
export const patchStateMessageRequest = async (data: PatchStateMessageRequestDto, token:string) => {
    const result = await axios.patch(PATCH_USER_STATE_MESSAGE_URL(), data, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
            const responseBody:PatchStateMessageResponseDto = response.data;
            const {code} = responseBody;
            return code;
        })
        .catch((error) => {
            const responseBody:ResponseDto = error.response.data;
            const {code} = responseBody;
            return code;
        });
    return result;
}

// 유저 페이지 게시물 리스트 불러오기 //
export const getUserBoardListRequest = async (userEmail: string) => {
const result = await axios.get(GET_USER_BOARD_LIST_URL(userEmail))
.then((response) => {
    const responseBody: GetUserBoardListResponseDto = response.data;
    return responseBody;
})
.catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
});
return result;
}

// 유저 페이지 채팅방 리스트 불러오기 //
export const getUserRoomListRequest = async (userEmail: string) => {
    const result = await axios.get(GET_USER_ROOM_LIST_URL(userEmail))
    .then((response) => {
        const responseBody: GetUserRoomListResponseDto = response.data;
        return responseBody;
    })
    .catch((error) => {
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
    }