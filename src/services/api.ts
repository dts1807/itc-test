import { PokemonListResponse, PokeApiTypeResponse } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonTypes = async () => {
    const res = await fetch(`${BASE_URL}/type`);
    return res.json();
};

export const getPokemonList = async (limit = 20, offset = 0, types: string[] = []): Promise<PokemonListResponse> => {
    if (types.length === 0) {
        const url = new URL(`${BASE_URL}/pokemon`);
        url.searchParams.append("limit", limit.toString());
        url.searchParams.append("offset", offset.toString());

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch pokemon list");
        return res.json();

    }
    const requests = types.map(t => fetch(`${BASE_URL}/type/${t}`).then(r => r.json() as Promise<PokeApiTypeResponse>));
    const responses = await Promise.all(requests);

    const pokemonGroups = responses.map((res: PokeApiTypeResponse) =>
        res.pokemon.map((p) => p.pokemon)
    );

    // Filter with AND
    const filteredResults = pokemonGroups.reduce((acc, current) => {
        return acc.filter(p => current.some(cp => cp.name === p.name));
    });

    return {
        count: filteredResults.length,
        results: filteredResults.slice(offset, offset + limit)
    };

};

export const getPokemonIdFromUrl = (url: string): string => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
};

export const getPokemonImageUrl = (id: string): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};