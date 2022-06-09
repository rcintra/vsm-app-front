import { Cidade } from "./cidade";

export class Cliente {
    id!: number;
    nome!: string;
    cpfCnpj!: string;
    cidade!: Cidade;
}
