import { ItemKanban } from "./coluna-item.model";

export interface ColunaTransicao {
    item: ItemKanban;
    de: string;
    para: string;
}