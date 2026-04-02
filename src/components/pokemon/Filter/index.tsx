'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
//Types
import { PokemonTypeItem } from '@/types/pokemon'

interface FilterItemProps {
    isActive: boolean;
    item: PokemonTypeItem;
    onClick: () => void;
}

function FilterItem({ isActive, item, onClick} : FilterItemProps) {

    return(
        <button
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={onClick}
        >
            {item.name}
        </button>
    )
}

export default function Filter({ types, selectedTypes }: { types: PokemonTypeItem[], selectedTypes: string[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleToggle = (name: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.getAll('type');

        if (current.includes(name)) {
            const updated = current.filter(t => t !== name);
            params.delete('type');
            updated.forEach(t => params.append('type', t));
        } else {
            params.append('type', name);
        }

        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div
            className="flex flex-wrap gap-2 mb-6"
        >
            { types.map(type => (
                <FilterItem
                    key={type.name}
                    isActive={selectedTypes.includes(type.name)}
                    item={type}
                    onClick={() => handleToggle(type.name)}
                />
            ))}
        </div>
    );
}