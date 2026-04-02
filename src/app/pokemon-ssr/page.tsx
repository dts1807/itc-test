import { getPokemonList, getPokemonTypes } from '@/services/api';
import Filter from '@/components/pokemon/Filter'
import ServerPagination from "@/components/pokemon/Pagination/ServerPagination";
import PokemonCard from '@/components/pokemon/Card';
import Link from "next/link";

export default async function PokemonServerPage({searchParams}: { searchParams: Promise<{ page?: string, type?: string | string[] }> }) {
    const limit = 20;
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const offset = (currentPage - 1) * limit;
    const selectedTypes = Array.isArray(params.type)
        ? params.type
        : params.type ? [params.type] : [];

    const [data, typesData] = await Promise.all([
        getPokemonList(20, offset, selectedTypes),
        getPokemonTypes()
    ]);

    const total = data?.count || 0

    return (
        <main className="p-8">
            <div className="flex justify-between justify-items-center mb-6 ">
                <h1 className="text-3xl font-bold text-green-500">Server Side Rendering (SSR)</h1>
                <Link
                    href={'/pokemon'}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Go to CSR
                </Link>
            </div>
            <div className={"flex justify-items-center"}>
                <p className={'mr-1'}>Total:</p>
                <span>{total}</span>
            </div>
            <Filter
                types={typesData?.results}
                selectedTypes={selectedTypes}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.results.map((p) => (
                    <PokemonCard key={p.name} name={p.name} url={p.url} />
                ))}
            </div>
            <ServerPagination
                currentPage={currentPage}
                offset={offset}
                limit={limit}
                total={total}
            />
        </main>
    );
}