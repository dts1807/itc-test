import Link from 'next/link';
interface PaginationProps {
    currentPage: number;
    offset: number;
    limit: number;
    total: number;
}

export default function Pagination ({ currentPage, total, offset, limit, ...rest }: PaginationProps) {
    const hasPrev = currentPage > 1;
    const hasNext = offset + limit < (total || 0);

    return(
        <div className="flex gap-4 mt-6">
            {hasPrev && (
                <Link
                    href={`/pokemon-ssr?page=${currentPage - 1}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Previous
                </Link>
            )}

            {hasNext && (
                <Link
                    href={`/pokemon-ssr?page=${currentPage + 1}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Next

                </Link>
            )}
        </div>
    )
}