package com.project.codematchr.dto.request.room;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostRoomRequestDto {
    @NotBlank
    private String roomTitle;

    @NotBlank
    private String roomPassword;

    private String roomImageUrl;
}
