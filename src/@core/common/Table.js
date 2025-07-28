import React, { useMemo } from "react";
import {
  Table,
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useSkin } from "../../utility/hooks/useSkin";
import PropTypes from "prop-types";

const ReusableTable = React.memo(
  ({
    headers,
    data,
    renderRow,
    headerContent,
    pageTitle,
    headerStyle,
    rowKey,
    emptyState,
    className,
    tableClassName,
    currentPage = 1,
    totalPages,
    onPageChange,
    showPagination,
  }) => {
    const { skin } = useSkin();

    // Memoize headers to prevent unnecessary re-renders
    const memoizedHeaders = useMemo(
      () => (
        <tr className="text-center">
          {headers.map((header, index) => (
            <th
              key={`header-${index}`}
              style={headerStyle || { fontSize: "18px", whiteSpace: "nowrap" }}
            >
              {header}
            </th>
          ))}
        </tr>
      ),
      [headers, headerStyle]
    );

    // Memoize rows to prevent unnecessary re-renders
    const memoizedRows = useMemo(() => {
      if (data.length === 0) {
        return (
          emptyState || (
            <tr>
              <td colSpan={headers.length} className="text-center py-4">
                داده ای موجود نمیباشد
              </td>
            </tr>
          )
        );
      }

      return data.map((item) => (
        <tr className="text-center" key={rowKey ? rowKey(item) : item.id}>
          {renderRow(item)}
        </tr>
      ));
    }, [data, renderRow, rowKey, emptyState, headers.length]);

    return (
      <Card className={className}>
        {(pageTitle || headerContent) && (
          <CardHeader className="border-bottom">
            {pageTitle && (
              <CardTitle tag="h4" className="w-100">
                {pageTitle}
              </CardTitle>
            )}
            {headerContent && (
              <Row className="mx-0 mt-1">
                <Col>
                  <div className="d-flex align-items-center">
                    {headerContent}
                  </div>
                </Col>
              </Row>
            )}
          </CardHeader>
        )}

        <div className="table-responsive">
          <Table
            dark={skin !== "light"}
            responsive
            hover
            className={tableClassName}
          >
            <thead>{memoizedHeaders}</thead>
            <tbody>{memoizedRows}</tbody>
          </Table>
          {showPagination && totalPages > 1 && onPageChange && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page} active={page === currentPage}>
                      <PaginationLink onClick={() => onPageChange(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              </Pagination>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

ReusableTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  headerContent: PropTypes.node,
  pageTitle: PropTypes.node,
  headerStyle: PropTypes.object,
  rowKey: PropTypes.func,
  emptyState: PropTypes.node,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
};

ReusableTable.defaultProps = {
  data: [],
  headerStyle: { fontSize: "18px" },
};

export default ReusableTable;
