export interface auth {
    authenticationToken?: {
        accessToken?: string,
        tokenType?: string,
    },
    setAuthenticationToken?: Function
}