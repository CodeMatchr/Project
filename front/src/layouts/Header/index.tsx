import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATION_PATH, MAIN_PATH, USER_PATH } from '../../constants';

// component //
export default function Header() {

    // state //
    // 로그인 상태 //
    const [signIn, setSignIn] = useState<boolean>(false);
    // 검색어 상태 //
    const [searchWord, setSearchWord] = useState<String>('');
    // 검색 아이콘 버튼 클릭 상태 //
    const [searchIconState, setSearchIconState] = useState<boolean>(false);


    // function //
    // 페이지 이동을 위한 네비게이트 함수 //
    const navigator = useNavigate();

    // event handler //
    // 메인 페이지 이동 버튼 클릭 이벤트(로고 및 로고 텍스트 버튼 클릭 시) //
    const onLogoButtonClickHandler = () => {
        navigator(MAIN_PATH);
    }

    // 로그인/회원가입 페이지 이동 버튼 클릭 이벤트 // 
    const onSignInButtonClickHandler = () => {
        navigator(AUTHENTICATION_PATH);
    }

    // 로그아웃 후 메인 페이지 이동 버튼 클릭 이벤트(비회원으로 전환) //
    const onSignOutButtonClickHandler = () => {
        navigator(MAIN_PATH);
    }

    // 마이 페이지 이동 버튼 클릭 이벤트(로그인을 한 회원만) //
    const onUserButtonClickHandler = () => {
        navigator(USER_PATH);
    }

    // 검색 아이콘 버튼 클릭 이벤트 //
    const onSearchIconButtonClickHandler = () => {
        if (searchIconState) setSearchIconState(false);
        else setSearchIconState(true);
    }

    // effect //

    // render //
    return (
        <div id='header'>
            <div className='header-box'>
                <div className='header-left' onClick={ onLogoButtonClickHandler }>
                    <div className='header-left-logo-icon'>logo</div>
                    <div className='header-left-logo-text'>Code Matchr</div>
                </div>
                <div className='header-right'>
                    {/* Sign in, Sign out, Search, Profile */}
                    <div className='header-right-sign-in-button' onClick={ onSignInButtonClickHandler }>Sign-In</div>
                    <div className='header-right-sign-out-button' onClick={ onSignOutButtonClickHandler }>Sign-Out</div>
                    {(searchIconState) ? (
                        <div className='header-right-search'>
                            <input className='header-right-search-input' placeholder='검색어를 입력해주세요.' />
                            <div className='header-right-search-icon-button' onClick={ onSearchIconButtonClickHandler }></div>
                        </div>) : (
                            <div className='header-right-search-icon-only'>
                                <div className='header-right-search-icon-button' onClick={ onSearchIconButtonClickHandler }></div>
                            </div>
                        )
                    }
                    <div className='header-right-profile-button' onClick={ onUserButtonClickHandler }>profile</div>
                </div>
            </div>
        </div>
    )
}
