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
  text: string
  id?: string
  date: Date
}

export interface IFirebaseAuthResponse {
  idToken: string
  expiresIn: string
}

export interface IFirebaseDBPost {
  name: string
}

export interface IFirebaseDBGet {
  [id: string]: IPost
}

export interface IAlert {
  text: string
  type: 'success' | 'dark' | 'danger'
}
