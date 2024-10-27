"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({
    itemCount,
    pageSize,
    currentPage,
}: Props
) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    const router = useRouter();
    const searchParams = useSearchParams();

    if(pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    }


    return (
        <div className="mt-4">
            <div>
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => changePage(1)}
                >
                    <ChevronFirst/>
                </Button>
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                >
                    <ChevronLeft/>
                </Button>
                <Button
                    variant="outline"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(currentPage + 1)}
                >
                    <ChevronRight/>
                </Button>
                <Button
                    variant="outline"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(pageCount)}
                >
                    <ChevronLast/>
                </Button>
            </div>
            <div>
                <p>Page {currentPage} of {pageCount}</p>
            </div>
        </div>
    );
};

export default Pagination;