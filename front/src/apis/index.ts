import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from '../interfaces/request/authentication';
import { SignInResponseDto, SignUpResponseDto } from '../interfaces/response/authentication';
import ResponseDto from '../interfaces/response/response.dto';
import GetLoginUserResponseDto from 'src/interfaces/response/User/get-login-user.response.dto';

const API_DOMAIN = 'http://localhost:4040/api/v1';

const SIGN_UP_URL = () => `${API_DOMAIN}/authentication/sign-up`;
const SIGN_IN_URL = () => `${API_DOMAIN}/authentication/sign-in`;

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

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

export const getSignInUserRequest = async (token:string) => {
    const headers = { headers: { 'Authorization' : `Bearer ${token}` } };
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