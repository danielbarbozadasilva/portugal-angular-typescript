export interface IAuth {
  status: number;
  success: boolean;
  message: string;
  data: {
    resultUserMapper: UserMapper;
    resultGenerateToken: TokenResult;
  };
}

interface UserMapper {
  _id: string;
  username: string;
  name: string;
  email: string;
  permissions: string;
}

interface TokenResult {
  auth: boolean;
  token: string;
  refreshToken: string;
}
