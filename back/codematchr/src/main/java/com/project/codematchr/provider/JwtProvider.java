package com.project.codematchr.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@Component
public class JwtProvider {
    
    @Value("${secret-key}")
    private String secretKey;

    public String create(String userEmail) {
        // description : 토큰 만료 기간 //
        Date expiredDate = Date.from(Instant.now().plus(5,ChronoUnit.HOURS));

        // description : JWT 생성 //
        String jwt = Jwts.builder()
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .setSubject(userEmail).setIssuedAt(new Date()).setExpiration(expiredDate)
            .compact();
            
            return jwt; 
    }

    public String validate(String jwt) {
        Claims payload = null;

        try {
            // description : JWT 검증 //
            payload = Jwts.parser().setSigningKey(secretKey)
            .parseClaimsJws(jwt).getBody();            
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return payload.getSubject();
    }
}
