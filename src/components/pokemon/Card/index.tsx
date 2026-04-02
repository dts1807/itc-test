'use client';

import Image from 'next/image';
import { getPokemonIdFromUrl, getPokemonImageUrl } from '@/services/api';

interface Props {
    name: string;
    url: string;
}

export default function PokemonCard({ name, url }: Props) {
    const id = getPokemonIdFromUrl(url);
    const imageUrl = getPokemonImageUrl(id);

    return (
        <div className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-4 text-center">
            <div className="relative w-32 h-32 flex items-center justify-center p-2 bg-gray-50 rounded-full group-hover:scale-105 transition-transform duration-300">
                <Image
                    src={imageUrl}
                    alt={`Hình ảnh ${name}`}
                    width={150}
                    height={150}
                    sizes="(max-width: 640px) 100px, 150px"
                    loading="lazy"
                    className="object-contain" // Giữ đúng tỷ lệ ảnh
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <span className="text-sm font-semibold text-gray-400">#{id.padStart(3, '0')}</span>
                <h3 className="text-lg font-bold text-gray-900 capitalize truncate group-hover:text-blue-600">
                    {name}
                </h3>
            </div>
        </div>
    );
}