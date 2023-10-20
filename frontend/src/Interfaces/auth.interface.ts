export interface auth {
    authenticationToken?: {
        accessToken?: string,
        tokenType?: string,
        expiresAt: string
    },
    setAuthenticationToken?: Function
}