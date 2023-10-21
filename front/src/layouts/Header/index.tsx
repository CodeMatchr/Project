import React, { useState, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTHENTICATION_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PAGE_PATH_VARIABLE, USER_PATH } from '../../constants';
import { useUserStore } from 'src/store';
import { useCookies } from 'react-cookie';

// component //
export default function Header() {

    // state //
    // 로그인 상태 //
    const [signIn, setSignIn] = useState<boolean>(false);
    // 검색어 상태 //
    const [searchWord, setSearchWord] = useState<String>('');
    // 검색 아이콘 버튼 클릭 상태 //
    const [searchIconState, setSearchIconState] = useState<boolean>(false);
    // 로그인 유저 정보 상태 //
    const { user, setUser } = useUserStore();
    // cookies 상태 //
    const [cookies, setCookie] = useCookies();
    // url 경로 상태 //
    const { pathname } = useLocation();
   


    // function //
    // 페이지 이동을 위한 네비게이트 함수 //
    const navigator = useNavigate();

    // search 버튼 보이기 여부 //
    const showSearch = !pathname.includes(USER_PATH('')) && pathname !== BOARD_WRITE_PATH() && !pathname.includes(BOARD_UPDATE_PATH(''));
    // 인증 화면인지 여부 //
    const isAuthentication = pathname === AUTHENTICATION_PATH;
    // 유저페이지 여부 //
    const isUser = user && pathname.includes(USER_PATH(user.userEmail));

    
    

    // event handler //
    // 메인 페이지 이동 버튼 클릭 이벤트(로고 및 로고 텍스트 버튼 클릭 시) //
    const onLogoButtonClickHandler = () => {
        navigator(MAIN_PATH);
    }

    // 로그인/회원가입 페이지 이동 버튼 클릭 이벤트 // 
    const onSignInButtonClickHandler = () => {
        setSignIn(true);
        navigator(AUTHENTICATION_PATH);
    }

    // 로그아웃 후 메인 페이지 이동 버튼 클릭 이벤트(비회원으로 전환) //
    const onSignOutButtonClickHandler = () => {
        setCookie('accessToken', '', {expires: new Date(), path: MAIN_PATH});
        setSignIn(false);
        setUser(null);
        navigator(MAIN_PATH);
    }

    // 마이 페이지 이동 버튼 클릭 이벤트(로그인을 한 회원만) //
    const onUserButtonClickHandler = () => {
        if(!user) return;
        navigator(USER_PATH(user.userEmail));
    }

    // 검색 아이콘 버튼 클릭 이벤트 //
    const onSearchIconButtonClickHandler = () => {
        if (searchIconState) setSearchIconState(false);
        else setSearchIconState(true);

        
    }
    // effect //
    // 로그인 유저 정보 여부 //
    useEffect(() => {
        setSignIn(user !== null);
    }, [user]);

   

    // render //
    return (
        <div id='header'>
            <div className='header-box'>
                <div className='header-left' onClick={ onLogoButtonClickHandler }>
                    <div className='header-left-logo-icon'></div>
                    <div className='header-left-logo-text'>Code Matchr</div>
                </div>
                <div className='header-right'>
                    {/* Sign in, Sign out, Search, Profile */}
                    {!isAuthentication && (
                    isUser ? (<div className='header-right-sign-out-button' onClick={ onSignOutButtonClickHandler }>Sign-Out</div>) : 
                    signIn ? (<div className='header-right-sign-out-button' onClick={ onSignOutButtonClickHandler }>Sign-Out</div>) :
                            (<div className='header-right-sign-in-button' onClick={ onSignInButtonClickHandler }>Sign-In</div>)
                    )}
                    {(searchIconState) ? (
                        <div className='header-right-search'>
                            <input className='header-right-search-input' placeholder='검색어를 입력해주세요.' />
                            <div className='header-right-search-icon-button' onClick={ onSearchIconButtonClickHandler }></div>
                        </div>) : (
                            <div className='header-right-search-icon-only'>
                                <div className='header-right-search-icon-button' onClick={ onSearchIconButtonClickHandler }></div>
                            </div>
                        )}
                    {!isAuthentication && 
                    signIn ? <div className='header-right-profile-button' onClick={ onUserButtonClickHandler }>profile</div> :
                             !isUser ? <></> : <div className='header-right-profile-button' onClick={ onUserButtonClickHandler }>profile</div>}
                </div>
            </div>
        </div>
    )
}
