export type Command = 'website' | 'upvote';

export interface LogInProps {
    username: string;
    password: string;
}

export interface SignUpProps {
    username: string;
    password: string;
    email: string;
}

export type WindowToOpen = 'login' | 'main' | null;

export interface WindowSettingsProps {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface UserSettingsProps {
    token: string;
    refreshToken: string;
}

export interface UserInfoState {
    username: string;
    email: string;
    isVerified: boolean;
    subscribed: boolean;
}

export interface ControlState {
    userIsConnected: boolean;
}
