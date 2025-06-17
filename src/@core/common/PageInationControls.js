import React, { useMemo } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationControls = React.memo(
  ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = useMemo(() => {
      const pages = [];
      const maxVisiblePages = 5;

      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
      <Pagination className="mt-3 justify-content-center">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            previous
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pageNumbers[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
            </PaginationItem>
            {pageNumbers[0] > 2 && (
              <PaginationItem disabled>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <PaginationItem key={page} active={page === currentPage}>
            <PaginationLink onClick={() => onPageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <PaginationItem disabled>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
      </Pagination>
    );
  }
);

export default PaginationControls;
