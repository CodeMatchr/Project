package com.project.codematchr.dto.response.compare;

import java.util.ArrayList;
import java.util.List;

import com.project.codematchr.entity.CompareEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CompareListResponseDto {
    private int compareResultNumber;
    private String compareControlGroup;
    private String compareExperimentalGroup;
    private String compareDatetime;
    private String compareResult;
    private String compareUserEmail;

    public CompareListResponseDto(CompareEntity compareEntity) {
        this.compareResultNumber = compareEntity.getCompareResultNumber();
        this.compareControlGroup = compareEntity.getCompareControlGroup();
        this.compareExperimentalGroup = compareEntity.getCompareExperimentalGroup();
        this.compareDatetime = compareEntity.getCompareDatetime();
        this.compareResult = compareEntity.getCompareResult();
        this.compareUserEmail = compareEntity.getCompareUserEmail();
    }

    public static List<CompareListResponseDto> copyCompareList(List<CompareEntity> compareEntity) {
        List<CompareListResponseDto> compareList = new ArrayList<>();

        for(CompareEntity resultSet: compareEntity) {
            CompareListResponseDto compare = new CompareListResponseDto(resultSet);
            compareList.add(compare);
        }

        return compareList;
    }
}
