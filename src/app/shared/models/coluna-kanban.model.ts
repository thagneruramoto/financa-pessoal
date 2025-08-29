import { ItemKanban } from "./coluna-item.model";

export interface ColunaKanban {
    id: string;
    titulo: string;
    itens: ItemKanban[];
    onExcluirItem?: (item: ItemKanban) => void
}