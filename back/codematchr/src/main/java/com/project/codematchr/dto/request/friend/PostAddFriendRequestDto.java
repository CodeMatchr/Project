package com.project.codematchr.dto.request.friend;


import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostAddFriendRequestDto {
    
    @NotBlank
    private String friendMyEmail;

    private String friendEmail;

}
