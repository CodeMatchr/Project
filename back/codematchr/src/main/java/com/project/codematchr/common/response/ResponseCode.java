package com.project.codematchr.common.response;

public interface ResponseCode {
    // 성공 Code
    String SUCCESS = "SU";

    // 요청 매개변수 검증 실패 Code
    String REQUEST_PARAMETER_VALIDATION_FAIL = "RF";

    // 존재하는 사용자 이메일 Code
    String EXISTED_USER_EMAIL = "EE";

    // 존재하지 않는 사용자 이메일 Code
    String NO_EXISTED_USER_EMAIL = "NE";

    // 존재하는 사용자 닉네임 Code
    String EXISTED_USER_NICKNAME = "EN";

    // 존재하지 않는 사용자 닉네임 Code
    String NO_EXISTED_USER_NICKNAME = "NN";

    // 존재하는 휴대전화 번호 Code
    String EXISTED_USER_TELNUMBER = "ET";

    // 로그인 실패 Code
    String SIGN_IN_FAIL = "SF";

    // 비밀번호 변경 실패 Code
    String PASSWORD_CHANGE_FAIL = "PF";

    // 설정되어 있는 비밀번호 Code
    String EXISTED_USER_PASSWORD = "EP";

    // 인증 실패 Code
    String AUTHENTICATION_FAIL = "AF";

    // 권한 없음 Code
    String NO_PERMISSION = "NP";

    // 존재하지 않는 게시물 번호 Code (NB)
    String NO_EXISTED_BOARD_NUMBER = "NB";

    // 존재하지 않는 비교 분석 결과 번호 Code
    String NO_EXISTED_COMPARE_RESULT_NUMBER = "NC";

    // 존재하지 않는 비교 분석 결과 Code
    String NO_EXISTED_COMPARE_RESULT = "NR";

    // 데이터베이스 에러 Code
    String DATABASE_ERROR = "DE";

    // 존재하지 않는 다인원 채팅방 Code (NR)
    String NO_EXISTED_ROOM_NUMBER = "NR";

    // 이미 설정되어 있는 다인원 채팅방 제목(기존 다인원 채팅방 제목) Code (ER)
    String EXISTED_ROOM_TITLE = "ER";

    // 이미 설정되어 있는 다인원 채팅방 비밀번호(기존 다인원 채팅방 비밀번호) Code
    String EXISTED_ROOM_PASSWORD = "EP";

    // 채팅방 비밀번호가 불인치 Code (NCP) //
    String NOT_CORRECT_PASSWORD =  "NCP";

}
