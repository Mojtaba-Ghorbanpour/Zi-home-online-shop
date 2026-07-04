type TUserRole = "USER" | "ADMIN";

interface IAddUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phoneNumber: number;
  address: string;
  role: TUserRole;
}

interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  phoneNumber?: number;
  address?: string;
  role: TUserRole;
}

interface ILoginBody {
  username: string;
  password: string;
}

interface ISignupBody {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
}
interface IUserOrder {
  id: string;
  name: string;
  price: number;
  date: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  collectionId: string;
}

interface IUserInfoSlice {
  info?: IUser;
  avatar?: string;
  isLoading: boolean;
}

interface IUserDetails extends ISignupBody {
  _id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
