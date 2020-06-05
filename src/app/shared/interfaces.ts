export interface IUser {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface IEnvironment {
  production: boolean,
  apiKey: string
}

export interface IFirebaseAuthResponse {
  idToken: string
  expiresIn: string
}
