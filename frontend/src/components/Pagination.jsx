import React, { useState, useEffect } from "react";
import {
  Pagination as BTPagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

/**
 * Generic pagination
 *
 * Manage the display and transition between pages
 * using a Function that sets an specific page
 *
 * Use either maxPage or count + page_size. If count is provided the maxpage will be computed
 * @param {Number} maxPage lastPage
 * @param {Number} page current page
 * @param {Number} count <optional> to compute max page
 * @param {Number} page_size <optional> to compute max page
 * @param {Function} setStatePage parent function that calls the API
 * @param {String} size one of "sm" "md" "lg"
 * @param {String} label aria-label, default is "generic"
 * @param {Number} displayFirst display always link to first page
 * @param {Number} displayLast display always link to last page
 * @param {Number} displayRange amount of aditional pages to display (min = 1)
 */
const Pagination = ({
  maxPageProp,
  page,
  count,
  page_size,
  setStatePage,
  size,
  label = "generic",
  displayFirst = true,
  displayLast = true,
  displayRange = 5,
}) => {
  const [range, setRange] = useState({
    leftPage: [],
    rightPage: [],
    max: (displayRange - 1) / 2,
  });

  // BUGFIX: there's a border case like
  // pageLimit = floor(50/25) = 2 and gives pages (0,1,2)
  // but pageLimit should be 1 so we can have the pages (0,1)
  const maxPage =
    count === undefined
      ? maxPageProp
      : Math.floor(count / page_size) === count / page_size
      ? Math.floor(count / page_size) - 1
      : Math.floor(count / page_size);

  let changePage = (direction) => {
    if (direction < 0) {
      if (page > 0) {
        setTimeout(() => setStatePage(page - 1), 300);
      }
    } else {
      if (maxPage >= page + 1) {
        setTimeout(() => setStatePage(page + 1), 300);
      }
    }
    goTop();
  };

  let setPage = (number) => {
    setTimeout(() => setStatePage(number), 300);
    goTop();
  };

  useEffect(() => {
    // Compute even distribution of pages at left and at right of current page
    // Add at most range.max
    var upperLimit = page + range.max <= maxPage ? page + range.max : maxPage;
    var lowerLimit = page - range.max >= 0 ? page - range.max : 0;
    var rightCount = upperLimit - page;
    var leftCount = page - lowerLimit;

    // Add remaining page count to the right if there's no space by the left
    var tmp;
    if (leftCount < range.max) {
      tmp = range.max - leftCount; // diff
      upperLimit = upperLimit + tmp <= maxPage ? upperLimit + tmp : maxPage;
    }

    // Add remaining page count to the left if there's no space by the right
    if (rightCount < range.max) {
      tmp = range.max - rightCount; // diff
      lowerLimit = lowerLimit - tmp >= 0 ? lowerLimit - tmp : 0;
    }

    var leftPages = [],
      rightPages = [];
    for (var i = lowerLimit; i < page; i++) {
      leftPages.push(i);
    }
    for (i = page + 1; i <= upperLimit; i++) {
      rightPages.push(i);
    }

    setRange((r) => ({ ...r, leftPage: leftPages, rightPage: rightPages }));
  }, [page, maxPage, range.max]);

  return (
    <BTPagination
      size={size}
      aria-label={`${label} page navigation`}
      style={{ justifyContent: "center" }}
    >
      {displayFirst ? (
        <PaginationItem disabled={0 === page}>
          <PaginationLink first onClick={() => setPage(0)} />
        </PaginationItem>
      ) : null}
      <PaginationItem disabled={0 === page}>
        <PaginationLink previous onClick={() => changePage(-1)} />
      </PaginationItem>
      {range.leftPage.map((el, key) => (
        <PaginationItem key={"left" + key}>
          <PaginationLink onClick={() => setPage(el)}>{el + 1}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem active>
        <PaginationLink>{page + 1}</PaginationLink>
      </PaginationItem>
      {range.rightPage.map((el, key) => (
        <PaginationItem key={"right" + key} onClick={() => setPage(el)}>
          <PaginationLink>{el + 1}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={maxPage < page + 1}>
        <PaginationLink next onClick={() => changePage(1)} />
      </PaginationItem>
      {displayLast ? (
        <PaginationItem disabled={maxPage < page + 1}>
          <PaginationLink last onClick={() => setPage(maxPage)} />
        </PaginationItem>
      ) : null}
    </BTPagination>
  );
};

const goTop = () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

export default Pagination;
