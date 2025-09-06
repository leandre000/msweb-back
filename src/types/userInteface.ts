 interface IUser{
    name:string;
    email:string;
    number:number;
    password:string;
    otp?:String;
    isVerified:Boolean;
    isResetVerified?: boolean;
}
export default IUser;