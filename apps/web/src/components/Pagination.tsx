"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void; // Optional for client-side handling
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  // Generate page numbers (with ellipsis for large ranges)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show 5 pages at most
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (totalPages > maxVisible) {
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      } else if (start === 1) {
        end = Math.min(totalPages, start + maxVisible - 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Handle client-side page changes
  const handleClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page); // Client-side callback
      return;
    }
    // Default: URL update (server-side)
  };

  return (
    <div className="flex items-center justify-center gap-2 my-8">
      {/* Previous Button */}
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        href={
          !onPageChange
            ? `?page=${currentPage - 1}&search=${search}`
            : undefined
        }
      >
        &larr; Prev
      </PaginationButton>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <PaginationButton
          key={page}
          active={page === currentPage}
          onClick={() => handleClick(page)}
          href={!onPageChange ? `?page=${page}&search=${search}` : undefined}
        >
          {page}
        </PaginationButton>
      ))}

      {/* Next Button */}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
        href={
          !onPageChange
            ? `?page=${currentPage + 1}&search=${search}`
            : undefined
        }
      >
        Next &rarr;
      </PaginationButton>
    </div>
  );
}

// Sub-component for individual buttons
function PaginationButton({
  children,
  active = false,
  disabled = false,
  onClick,
  href,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const baseStyles = "px-4 py-2 rounded-md border transition-all";
  const activeStyles = active ? "bg-blue-600 text-white border-blue-600" : "";
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:bg-gray-100";

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${activeStyles} ${disabledStyles}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${activeStyles} ${disabledStyles}`}
    >
      {children}
    </button>
  );
}
