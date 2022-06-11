import { Cidade } from "./cidade";

export class Cliente {
    id!: number;
    nome!: string;
    cpfCnpj!: string;
    endereco!: string;
    numero!:number;
    bairro!:string;
    cep!:number;
    telefone!:number;    
    email!:string;
    habilitado!: boolean;
    cidade!: Cidade;
}
