package com.goldshop.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    @jakarta.annotation.PostConstruct
    public void init() {
        if (secretKey == null || secretKey.trim().isEmpty()) {
            throw new IllegalStateException("JWT_SECRET is missing or empty.");
        }
        if ("replace-with-a-very-long-secure-secret-key-for-jwt-generation-in-production".equals(secretKey)) {
            throw new IllegalStateException("JWT_SECRET is using the insecure default value. Must be overridden in production environment.");
        }
        
        String trimmed = secretKey.trim();
        byte[] keyBytes = null;
        
        try {
            byte[] decoded = Decoders.BASE64.decode(trimmed);
            if (decoded.length >= 32) {
                keyBytes = decoded;
            }
        } catch (Exception ignored) {
        }
        
        if (keyBytes == null) {
            byte[] rawBytes = trimmed.getBytes(java.nio.charset.StandardCharsets.UTF_8);
            if (rawBytes.length >= 32) {
                keyBytes = rawBytes;
            }
        }
        
        if (keyBytes == null) {
            throw new IllegalStateException("JWT_SECRET must contain at least 32 secure bytes (256 bits). Provide a stronger secret.");
        }
    }

    private Key getSignInKey() {
        String trimmed = secretKey.trim();
        byte[] keyBytes = null;
        try {
            byte[] decoded = Decoders.BASE64.decode(trimmed);
            if (decoded.length >= 32) {
                keyBytes = decoded;
            }
        } catch (Exception ignored) {
        }
        
        if (keyBytes == null) {
            keyBytes = trimmed.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        }
        
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
