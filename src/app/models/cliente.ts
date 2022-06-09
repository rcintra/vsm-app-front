import { Cidade } from "./cidade";

export class Cliente {
    id!: number;
    nome!: string;
    cpfCnpj!: string;
    habilitado!: boolean;
    cidade!: Cidade;
}
