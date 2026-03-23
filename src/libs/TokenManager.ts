import nookies from 'nookies';


export class TokenManager {
    static set (token: string | null) {

        if (!token) {
            nookies.destroy(undefined, 'TOKEN')
            return
        }

        nookies.set(undefined, 'TOKEN', token)
    }

    static get() {
        return nookies.get(undefined).TOKEN
    }
}