import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from '../interfaces/request/authentication';
import { SignInResponseDto, SignUpResponseDto } from '../interfaces/response/authentication';
import ResponseDto from '../interfaces/response/response.dto';
import GetLoginUserResponseDto from 'src/interfaces/response/User/get-login-user.response.dto';
import { GetUserBoardListResponseDto, GetUserResponseDto, GetUserRoomListResponseDto, PatchNicknameResponseDto, PatchProfileImageUrlResponseDto } from 'src/interfaces/response/User';
import { PatchNicknameRequestDto, PatchProfileImageUrlRequestDto, PatchStateMessageRequestDto } from 'src/interfaces/request/user';
import PatchStateMessageResponseDto from 'src/interfaces/response/User/patch-state-message-response.dto';
import PostBoardRequestDto from 'src/interfaces/request/board/post-board.request.dto';
import PostBoardResponseDto from 'src/interfaces/response/board/post-board.response.dto';
import GetRoomResponseDto from 'src/interfaces/response/room/get-room.response.dto';
import PostRoomRequestDto from 'src/interfaces/request/room/post-room.request.dto';
import PostRoomResponseDto from 'src/interfaces/response/room/post-room.response.dto';
import PatchBoardResponseDto from 'src/interfaces/response/board/patch-board.response.dto';
import PatchBoardRequestDto from 'src/interfaces/request/board/patch-board.request.dto';
import PatchRoomTitleRequestDto from 'src/interfaces/request/room/patch-room-request.dto';
import PatchRoomTitleResponseDto from 'src/interfaces/response/room/patch-room-title.response.dto';
import PatchRoomPasswordRequestDto from 'src/interfaces/request/room/patch-room-password-request.dto';
import PatchRoomPasswordResponseDto from 'src/interfaces/response/room/patch-room-password.response.dto';
import PatchRoomImageUrlResponseDto from 'src/interfaces/response/room/patch-room-image-url-response.dto';
import GetBoardResponseDto from 'src/interfaces/response/board/get-board.response.dto';
import GetTop3FavoriteResponseDto from 'src/interfaces/response/board/getTop3Favorite.response.dto';
import GetTop3CommentResponseDto from 'src/interfaces/response/board/getTop3Comment.response.dto';
import GetTop3ViewResponseDto from 'src/interfaces/response/board/getTop3View.response.dto';
import DeleteBoardResponseDto from 'src/interfaces/response/board/delete-board.response.dto';
import { GetBoardListResponeDto } from 'src/interfaces/response/board';

const API_DOMAIN = 'http://localhost:4040/api/v1';

// Authentication 관련 //
const SIGN_UP_URL = () => `${API_DOMAIN}/authentication/sign-up`;
const SIGN_IN_URL = () => `${API_DOMAIN}/authentication/sign-in`;

// 로그인 사용자 정보 불러오기 //
const GET_SIGN_IN_USER_URL = () => `http://localhost:4040/api/v1/user`;
// 사용자 //
const GET_USER_URL = (userEmail: string) => `${API_DOMAIN}/user/${userEmail}`;

// 유저페이지 게시물 리스트 불러오기 //
const GET_USER_BOARD_LIST_URL = (userEmail: string) => `${API_DOMAIN}/board/user-board-list/${userEmail}`;
// 유저페이지 채팅방 리스트 불러오기 //
const GET_USER_ROOM_LIST_URL = (userEmail: string) => `${API_DOMAIN}/room/list/${userEmail}`;

// 닉네임 변경 //
const PATCH_USER_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
// 프로필 이미지 변경 //
const PATCH_USER_PROFILE_URL = () => `${API_DOMAIN}/user/profile`;
// 상태메세지 변경 //
const PATCH_USER_STATE_MESSAGE_URL = () => `${API_DOMAIN}/user/state-message`;

// 게시글 //
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;

// 파일 업로드 //
const UPLOAD_FILE = () => `http://localhost:4040/file/upload`;

// 게시물 수정 //
const PATCH_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
// 게시물 삭제 //
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

// 게시물 수정시 게시물 불러오기 //
const GET_BOARD_URL = (boardNumber:number | string) => `${API_DOMAIN}/board/${boardNumber}`;


// 메인페이지 top3 좋아요
const GET_TOP3_FAVORITE_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3/favorite`;
// 메인페이지 top3 댓글
const GET_TOP3_COMMENT_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3/comment`;
// 메인페이지 top3 조회수
const GET_TOP3_VIEW_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3/view`;

// 게시물 불러오기 최신순 //
const  GET_BOARD_LIST_CURRENT = (section: number) => `${API_DOMAIN}/board/board-list/${section}`;


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
export const getSignInUserRequest = async (token: string) => {
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
    const result = await axios.patch(PATCH_USER_NICKNAME_URL(), data, { headers: { Authorization: `Bearer ${token}` } })
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
    const result = await axios.patch(PATCH_USER_PROFILE_URL(), data, { headers: { Authorization: `Bearer ${token}` } })
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
    const result = await axios.patch(PATCH_USER_STATE_MESSAGE_URL(), data, { headers: { Authorization: `Bearer ${token}` } })
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

// 게시글 작성 //
export const postBoardRequest = async (data : PostBoardRequestDto, token:string) => {
    const result = await axios.post(POST_BOARD_URL(), data,{ headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
        const responseBody : PostBoardResponseDto = response.data;
        const {code} = responseBody;
        return code;
    })   
    .catch((error) => {
        const responseBody : ResponseDto = error.response.date;
        const {code} = responseBody;
        return code;
    });
    return result;
}


const GET_ROOM_URL = (roomNumber : number | string) => `${API_DOMAIN}/room/${roomNumber}/chat`;
const POST_ROOM_URL = (userEmail : string) => `${API_DOMAIN}/room/create/${userEmail}`;
const PATCH_ROOM_TITLE_URL = (roomNumber : number | string) => `${API_DOMAIN}/room/${roomNumber}/roomTitle`;
const PATCH_ROOM_PASSWORD_URL = (roomNumber : number | string) => `${API_DOMAIN}/room/${roomNumber}/roomPassword`;
const PATCH_ROOM_IMAGE_URL = (roomNumber : number | string) => `${API_DOMAIN}/room/${roomNumber}/roomImageUrl`;



// 채팅방 불러오기 //
export const getRoomRequest = async (roomNuber : number | string) => {
    const result = await axios.get(GET_ROOM_URL(roomNuber))
    .then((response) => {
        const responseBody: GetRoomResponseDto = response.data;
        return responseBody;
    }).catch((error) => {
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    })

    return result;
}

// 채팅방 만들기 //
export const postRoomRequest = async (userEmail: string, data: PostRoomRequestDto, token: string) => {
    const result = await axios.post(POST_ROOM_URL(userEmail), data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
        const responseBody: PostRoomResponseDto = response.data;
        const { code } = responseBody;
        return code;
    }).catch((error) => {
        const responseBody: ResponseDto = error.response.data;
        const { code } = responseBody;
        return code;
    })
    return result;
}

// 채팅방 이름 변경 //
export const PatchRoomTitleRequest = async (roomNumber : number | string, data : PatchRoomTitleRequestDto, token : string) => {
    const result = await axios.patch(PATCH_ROOM_TITLE_URL(roomNumber), data, { headers: { Authorization : `Bearer ${token}` } })
    .then((response) => {
        const responseBody : PatchRoomTitleResponseDto = response.data;
        const { code } = responseBody;
        return code;
    }).catch((error) => {
        const responseBody: ResponseDto = error.response.data;
        const { code } = responseBody;
        return code;
    });

    return result;
}

// 채팅방 비밀번호 변경 //
export const PatchRoomPasswordRequest = async (roomNumber : number | string, data : PatchRoomPasswordRequestDto, token : string) => {
    const result = await axios.patch(PATCH_ROOM_PASSWORD_URL(roomNumber), data, { headers : {Authorization : `Bearer ${token}`}})
    .then((response) => {
        const responseBody : PatchRoomPasswordResponseDto = response.data;
        const { code } = responseBody;
        return code;
    }).catch((error) => {
        const responseBody: ResponseDto = error.response.data;
        const { code } = responseBody;
        return code;
    });

    return result;
}

// 채팅방 이미지 수정 //
export const PatchRoomImageUrlRequest = async (roomNumber : number |string, data : PatchRoomPasswordRequestDto, token : string) => {
    const result = await axios.patch(PATCH_ROOM_IMAGE_URL(roomNumber), data, { headers : {Authorization : `Bearer ${token}`} })
    .then((response) => {
        const responseBody : PatchRoomImageUrlResponseDto = response.data;
        const { code } = responseBody;
        return code;
    }).catch((error) => {
        const responseBody: ResponseDto = error.response.data;
        const { code } = responseBody;
        return code;
    });

    return result;
}

// 파일 업로드 //
export const uploadFileRequest = async (data: FormData) => {
    const result = await axios.post(UPLOAD_FILE(), data, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response) => {
      const imageUrl: string = response.data;
      return imageUrl;
    })
    .catch((error) => null);
    return result;
  }

// 게시물 수정 //
  export const patchBoardRequest = async (boardNumber: number | string, data: PatchBoardRequestDto, token: string) => {
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const responseBody: PatchBoardResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
    return result;
  }

  // 게시물 삭제 //
  export const deleteBoardRequest = async (boardNumber: number | string, token: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
         const responseBody: DeleteBoardResponseDto = response.data;
         const { code } = responseBody;
         return code;
    }).catch((error) => {
         const responseBody: ResponseDto = error.response.data;
         const { code } = responseBody;
         return code;
    });

    return result;
}

  // 게시물 불러오기 //
  export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: GetBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
    return result;
  }

  // top3 좋아요 게시물 불러오기 //
  export const getFavoriteListRequest = async () => {
    const result = await axios.get(GET_TOP3_FAVORITE_BOARD_LIST_URL())
    .then((response) => {
        const responseBody : GetTop3FavoriteResponseDto = response.data;
        return responseBody;
    })
    .catch((error) => {
        const responseBody : ResponseDto = error.response.data;
        return responseBody;
    });
    return result;

  }

  // top3 댓글 게시물 불러오기 //
  export const getCommentListRequest = async () => {
    const result = await axios.get(GET_TOP3_COMMENT_BOARD_LIST_URL())
    .then((response) => {
        const responseBody : GetTop3CommentResponseDto = response.data;
        return responseBody;
    })
    .catch((error) => {
        const responseBody : ResponseDto = error.response.data;
        return responseBody;
    });
    return result;

  }

  // top3 조회수 게시물 불러오기 //
  export const getViewListRequest = async () => {
    const result = await axios.get(GET_TOP3_VIEW_BOARD_LIST_URL())
    .then((response) => {
        const responseBody : GetTop3ViewResponseDto = response.data;
        return responseBody;
    })
    .catch((error) => {
        const responseBody : ResponseDto = error.response.data;
        return responseBody;
    });
    return result;

  }

  // 게시물 불러오기 최신순 //
  export const getBoardListCurrentRequest = async (section : number) => {
    const result = await axios.get(GET_BOARD_LIST_CURRENT(section))
    .then((response) => {
        const responseBody : GetBoardListResponeDto = response.data;
        return responseBody;
    })
    .catch((error) => {
        const responseBody : ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
  }