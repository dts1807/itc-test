export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    results: PokemonListItem[];
    count: number;
}

export interface PokemonTypeItem {
    name: string;
    url: string;
}

interface TypePokemonEntry {
    pokemon: PokemonListItem;
    slot: number;
}

export interface PokeApiTypeResponse {
    id: number;
    name: string;
    pokemon: TypePokemonEntry[];
}