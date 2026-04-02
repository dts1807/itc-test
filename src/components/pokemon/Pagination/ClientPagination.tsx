
interface PaginationProps {
    currentPage: number;
    offset: number;
    limit: number;
    total: number;
    onPrevButtonClick?: () => void;
    onNextButtonClick?: () => void;
}

export default function Pagination ({ currentPage, total, offset, limit, ...rest }: PaginationProps) {
    const hasPrev = currentPage > 1;
    const hasNext = offset + limit < (total || 0);

    const { onPrevButtonClick, onNextButtonClick } = rest;

    return(
        <div className="flex gap-4 mt-6">
            {hasPrev && (
                <button
                    onClick={onPrevButtonClick}
                    className="px-4 py-2 border rounded hover:bg-gray-800 cursor-pointer"
                >
                    Previous
                </button>
            )}

            {hasNext && (
                <button
                    onClick={onNextButtonClick}
                    className="px-4 py-2 border rounded hover:bg-gray-800 cursor-pointer"
                >
                    Next
                </button>
            )}
        </div>
    )
}