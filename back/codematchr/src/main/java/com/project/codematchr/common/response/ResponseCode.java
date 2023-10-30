package com.project.codematchr.common.response;

public interface ResponseCode {
    
    String SUCCESS = "SU";

    String REQUEST_PARAMETER_VALIDATION_FAIL = "RF";

    String EXISTED_USER_EMAIL = "EE";

    String NO_EXISTED_USER_EMAIL = "NE";

    String EXISTED_USER_NICKNAME = "EN";

    String NO_EXISTED_USER_NICKNAME = "NN";

    String EXISTED_USER_TELNUMBER = "ET";

    String SIGN_IN_FAIL = "SF";

    String PASSWORD_CHANGE_FAIL = "PF";

    String EXISTED_USER_PASSWORD = "EP";

    String AUTHENTICATION_FAIL = "AF";

    String NO_PERMISSION = "NP";

    String NO_EXISTED_BOARD_NUMBER = "NB";

    String NO_EXISTED_COMPARE_RESULT_NUMBER = "NC";

    String NO_EXISTED_COMPARE_RESULT = "NR";

    String DATABASE_ERROR = "DE";

    String NO_EXISTED_ROOM_NUMBER = "NR";

    String EXISTED_ROOM_TITLE = "ER";

    String EXISTED_ROOM_PASSWORD = "EP";

    String NOT_CORRECT_PASSWORD =  "NCP";

}
