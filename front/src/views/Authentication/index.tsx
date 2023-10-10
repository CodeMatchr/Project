import React from 'react';
import { useState } from 'react';
import './style.css';
import InputBox from '../../components/InputBox';

//            component           //
export default function Authentication() {
//            state           //
//            function           //
//            event handler           //


    //            component           //
    // description : 로그인 컴포넌트 //
    const SignInCard = () => {
      //            state           //
      // description : 로그인 error 상태 //
      const [error, setError] = useState<boolean>(true);
      // description : email 입력값 상태 //
      const [email, setEmail] = useState<string>('');
      // description : password 입력값 상태 //
      const [password, setPassword] = useState<string>('');

      //            function           //
      //            event handler           //
      //            component           //
      //            effect           //
      //            render           //
      return (
        <div className='authentication-card'>
          <div className='authentication-top'>
            <div className='authentication-top-text-box'>
              <div className='authentication-top-text'>Sign in to your account</div>
              <div className='authentication-top-text-opercity'>1/2</div>
            </div>
            <div className='authentication-top-member-box'>
              <div className='authentication-top-member-box-left'>Not a member?</div>
              <div className='authentication-top-member-box-right'>Make your account</div>
            </div>
          </div>
          <div className='authentication-middle'>
            <div className='authentication-middle-input-container'>
              <InputBox label='Email address' type='text' placeholder='이메일을 입력해주세요.' error={error} value={email} setValue={setEmail} />
              <InputBox label='Password' type='password' placeholder='비밀번호를 입력해주세요.' error={error} value={password} setValue={setPassword}/>
                <div className='authentication-middle-button-box'>
                  {error && error ? 
                    <button className='authentication-middle-button-error'>Sign in</button> : 
                    <button className='authentication-middle-button'>Sign in</button>
                  }
                </div>
            </div>
          </div>
          <div className='authentication-bottom'>
            <div className='authentication-bottom-line-box'>
              <div className='divider'></div>
              <div className='authentication-bottom-line-text'>Or continue with</div>
            </div>
            <div className='authentication-bottom-oauth-login-box'>
              <div className='authentication-bottom-oauth-login-github-box'>
                <div className='authentication-bottom-oauth-login-github-logo'>로고</div>
                <div className='authentication-bottom-oauth-login-github'>Github</div>
              </div>
              <div className='authentication-bottom-oauth-login-kakao-box'>
                <div className='authentication-bottom-oauth-login-kakao-logo'>로고</div>
                <div className='authentication-bottom-oauth-login-kakao'>Kakao</div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    //            component           //
    // description : 회원가입 컴포넌트 //
    const SignUpCard = () => {
      //            state           //
      // description : 회원가입 페이지 상태 //
      const [page, setPage] = useState<1|2>(1);

      // description : 이메일 상태 //
      const [email, setEmail] = useState<string>('');
      // description : 이메일 에러 상태 //
      const [emailPatternError, setEmailPatternError] = useState<boolean>(false);
      // description : 이메일 중복 에러 상태 //
      const [emailDuplicationError, setEmailDuplicationError] = useState<boolean>(false);
      // description : 이메일 공백 에러 상태 //
      const [emailBlankError, serEmailBlankError] = useState<boolean>(true);

      // description : 비밀번호 상태 //
      const [password, setPassword] = useState<string>('');
      // description : 비밀번호 에러 상태 //
      const [passwordError, setPasswordError] = useState<boolean>(true);

      // description : 비밀번호 확인 상태 //
      const [passwordValidation, setPasswordValidation] = useState<string>('');
      // description : 비밀번호 확인 에러 상태 //

      const [passwordValidationError, setPasswordValidationError] = useState<boolean>(true); 
      // description : 닉네임 상태 //
      const [nickname, setNickname] = useState<string>('');
      // description : 닉네임 에러상태 //
      const [nicknameError, setNicknameError] = useState<boolean>(true);

      // description : 휴대전화번호 상태 //
      const [telnumber, setTelnumber] = useState<string>('');
      // description : 휴대전화번호 에러상태 //
      const [telnumberError, setTelnumberError] = useState<boolean>(true);
      
      // description : 주소 상태 //
      const [address, setAddress] = useState<string>('');
      // description : 주소 에러상태 //
      const [addressError, setAddressError] = useState<boolean>(true);

      // description : 상세주소 입력값 상태 //
      const [addressDetail, setAddressDetail] = useState<string>('');
            
      //            function           //
      //            event handler           //
      //            component           //
      //            effect           //
      //            render           //
      return (
        <div className='authentication-card'>
          <div className='authentication-top'>
            <div className='authentication-top-text-box'> 
              <div className='authentication-top-text'>Creact account</div>
              <div className='authentication-top-text-opercity'>{`${page}/2`}</div>
            </div>
          </div>
          <div className='authentication-middle'>
            <div className='authentication-middle-input-container'>
              {page === 1 ? (
                <>
                  <InputBox label='Email address *' type='text' placeholder='이메일을 입력해주세요.' error={emailPatternError || emailDuplicationError || emailBlankError} helper={emailPatternError ? '이메일 형식이 맞지 않습니다. 형식에 맞게 다시 입력해주세요.' : emailDuplicationError ? '존재하는 이메일입니다.' : emailBlankError ? '이메일을 입력하지 않았습니다. 이메일을 입력해주세요.' : ''} value={email} setValue={setEmail} />
                  <InputBox label='Password *' type='password' placeholder='비밀번호를 입력해주세요.' error={passwordError} helper={passwordError ? '비밀번호를 입력하지 않았습니다. 비밀번호를 입력해주세요.' : ''} value={password} setValue={setPassword} />
                  <InputBox label='Password Validation *' type='password' placeholder='입력하신 비밀번호를 다시 입력해주세요.' error={passwordValidationError} helper={passwordValidationError ? '입력하신 비밀번호를 다시 입력해주세요.' : ''} value={passwordValidation} setValue={setPasswordValidation} />
                </>
                ) : (
                <>
                  <InputBox label='Nickname *' type='text' placeholder='닉네임을 입력해주세요.' error={nicknameError} value={nickname} setValue={setNickname} />
                  <InputBox label='Telnumber *' type='text' placeholder='휴대전화 번호를 입력해주세요.' error={telnumberError} value={telnumber} setValue={setTelnumber} />
                  <InputBox label='Address *' type='text' placeholder='우편번호 찾기' error={addressError} value={address} setValue={setAddress} />
                  <InputBox label='Address detail *' type='text' placeholder='상세 주소를 입력해주세요.'  value={addressDetail} setValue={setAddressDetail} />
                </>
                )
              }
            </div>
          </div>
          <div className='authentication-bottom'>
            <div className='authentication-bottom-button'>
              {page === 1 ? 'NEXT' : 'Sign Up '}
            </div>
            <div className='authentication-bottom-button-text'>
              이미 계정이 있으신가요? <span className='authentication-emphasis'>Sign In</span> 
            </div>
          </div>
        </div>
      )
    }
    
    
//            effect           //
//            render           //
  return (
    <div id='authentication-wrapper'>
      <div className='authentication-left'></div>
      <div className='authentication-right'>
        <SignUpCard />
      </div>
    </div>
  )
}
