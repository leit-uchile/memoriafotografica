import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const HomePagination = ({
  pageLimit,
  page,
  maxAllowed,
  setStatePage,
  nbPhotos
}) => {
  let changePage = direction => {
    if (direction < 0) {
      if (page > 0) {
        setTimeout(() => setStatePage(page - 1), 300);
      }
    } else {
      if (Math.floor(nbPhotos / maxAllowed) >= page + 1) {
        setTimeout(() => setStatePage(page + 1), 300);
      }
    }
    goTop();
  };

  let setPage = number => {
    setTimeout(() => setStatePage(number), 300);
    goTop();
  };

  return (
    <Pagination
      size="lg"
      aria-label="Home page navigation"
      style={{ justifyContent: "center" }}
    >
      <PaginationItem disabled={0 === page}>
        <PaginationLink first onClick={() => setPage(0)} />
      </PaginationItem>
      <PaginationItem disabled={0 === page}>
        <PaginationLink previous onClick={() => changePage(-1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink>{page + 1}</PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={pageLimit < page + 1}>
        <PaginationLink next onClick={() => changePage(1)} />
      </PaginationItem>
      <PaginationItem disabled={pageLimit < page + 1}>
        <PaginationLink last onClick={() => setPage(pageLimit)} />
      </PaginationItem>
    </Pagination>
  );
};

const goTop = () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });

export default HomePagination;
