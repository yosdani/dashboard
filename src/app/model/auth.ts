export interface Auth {
    id: number;
    name: string;
    email: string;
    phone: number;
    token: string;
    token_id: number;
    avatar: string | null;
    device: string | null;
    role: [
        {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
                    }
    ];
}

export interface Authentication {
    email: string;
    password: string;
}


export interface SignUp {
    name: string;
    email: string;
    avatar: string;
    password: string;
    password_confirmation: string;
    phone: string;
   }

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    device: string;
    createdAt: Date;
    updatedAt: Date;
}
