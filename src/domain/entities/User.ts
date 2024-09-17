import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  home_ip: string;
}

export class User{  
  public id: string;
  public name: string;
  public email: string;
  public avatar?: string;
  public home_ip: string;
  public password: string;

  constructor({ name, email, password, avatar = undefined, home_ip }: Omit<UserType, 'id'>, id?: string) {
    this.id = id ?? uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar || undefined;
    this.home_ip = home_ip;
  }

  /** Método para hash de senha antes de salvar o usuário */
  async hashPassword(): Promise<void> {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw new Error('Erro ao criptografar a senha');
    }
  }
  /** Método para comparar a senha fornecida com a senha hash armazenada */
  async comparePassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error('Erro ao comparar as senhas');
    }
  }
  /** Método para exibir dados básicos do usuário (sem expor a senha) */
  getPublicProfile(): Omit<UserType, 'password'> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      home_ip: this.home_ip,
    };
  }
}