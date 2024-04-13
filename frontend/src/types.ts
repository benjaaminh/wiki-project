export interface User {
    id: any //maybe not
    username: string,
    password: string,
    name: string
    posts?: Post[]
}
export interface LoginCredentials {
    username: string,
    password: string
}
export interface Post {
    id?: any
    title: string;
    datePosted?: Date;
    dateEdited?: Date;
    content: string;
    imgSrc?: string;
    user?: User
    img?: {
        data: {
            data: Buffer
        }
        contentType: string
      }
}