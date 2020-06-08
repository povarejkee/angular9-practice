export interface IEnvironment {
  production: boolean,
  apiKey: string,
  firebaseDBUrl: string
}

export interface IUser {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface IPost {
  author: string
  title: string
  text: boolean
  id?: string
  date: Date
}

export interface IFirebaseAuthResponse {
  idToken: string
  expiresIn: string
}

export interface IFirebaseDBResponse {
  name: string
}
