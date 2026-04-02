'use client';

import { useQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonTypes } from '@/services/api';
import { useSearchParams, useRouter } from 'next/navigation';
import Filter from "@/components/pokemon/Filter";
import ClientPagination from "@/components/pokemon/Pagination/ClientPagination";
import PokemonCard from '@/components/pokemon/Card';
import Link from "next/link";

export default function PokemonClientPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const limit = 20;
    const currentPage = Number(searchParams.get('page')) || 1;
    const offset = (currentPage - 1) * limit;
    const selectedTypes = searchParams.getAll('type');

    const { data, isLoading, error } = useQuery({
        queryKey: ['pokemon-list', limit, offset, selectedTypes],
        queryFn: () => getPokemonList(limit, offset, selectedTypes),
    });


    const { data: typesData } = useQuery({
        queryKey: ['types'],
        queryFn: getPokemonTypes,
    });

    const total = data?.count || 0

    const goToPage = (page: number) => {
        router.push(`/pokemon?page=${page}`);
    };

    const handleGoToNextPage = () => {
        goToPage(currentPage + 1);
    }

    const handleGoToPreviousPage = () => {
        goToPage(currentPage - 1);
    }

    if (isLoading) return <div className="p-10 text-center">Đang tải Pokemon...</div>;
    if (error) return <div>Có lỗi xảy ra!</div>;

    return (
        <main className="p-8">
            <div className="flex justify-between justify-items-center mb-6 ">
                <h1 className="text-3xl font-bold text-blue-500">Client Side Rendering (CSR)</h1>
                <Link
                    href={'/pokemon-ssr'}
                    className="text-center self-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Go to SSR
                </Link>
            </div>
            <div className={"flex justify-items-center mb-6"}>
                <p className={'mr-1'}>Total:</p>
                <span>{total}</span>
            </div>
            <Filter
                types={typesData?.results || []}
                selectedTypes={selectedTypes}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.results.map((p) => (
                    <PokemonCard key={p.name} name={p.name} url={p.url} />
                ))}
            </div>
            <ClientPagination
                currentPage={currentPage}
                offset={offset}
                limit={limit}
                total={total}
                onNextButtonClick={handleGoToNextPage}
                onPrevButtonClick={handleGoToPreviousPage}
            />
        </main>
    );
}