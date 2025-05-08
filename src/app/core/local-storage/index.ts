import { IDataModel, IResponseAuthSignIn } from "../models/models.auth";

export class AuthStorage {
  private tokenKey: string;

  constructor() {
    this.tokenKey = process.env.REACT_APP_TOKEN_KEY!;
  }

  public getToken(): string {
    const storedData = localStorage.getItem(this.tokenKey);
    if (!storedData) return '';
    try {
      const parsed: IDataModel = JSON.parse(storedData);
      return parsed?.token || '';
    } catch (error) {
      return '';
    }
  }

  public getUser(): IDataModel | boolean {
    const storedData = localStorage.getItem(this.tokenKey);
    if (!storedData) return false;
    try {
      const parsed: IDataModel = JSON.parse(storedData);
      return parsed;
    } catch (error) {
      return false;
    }
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return Boolean(token && token?.trim()?.length > 0);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public saveAuth(data: IResponseAuthSignIn): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(data));
  }
}
