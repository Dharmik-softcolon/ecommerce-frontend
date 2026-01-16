import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        accessToken?: string;
    }

    interface Session {
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            image?: string;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        id?: string;
    }
}
