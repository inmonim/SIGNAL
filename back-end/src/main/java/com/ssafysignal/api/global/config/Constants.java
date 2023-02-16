package com.ssafysignal.api.global.config;

public final class Constants {
    /**
     * Resource 대상
     * @see SecurityConfig
     */
    public static final String[] resourceArray = new String[] { "/static", "/swagger-ui/**"};

    /**
     * 권한제외 대상
     * @see SecurityConfig
     */
    public static final String[] permitAllArray = new String[] { "/auth", "/swagger-ui/**", "/swagger-ui" };

    /**
     * 인터셉터 제외 대상
     * @see WebMvcConfig
     */
    public static final String[] interceptorArray = new String[] { "/css/**", "/fonts/**", "/images/**", "/js/**",
            "/modules/**", "/login.do", "/logout.do", "/upload.do" };
}
