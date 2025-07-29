import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Layers } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { useDebounce } from "use-debounce";
import EmptyState from "../@core/common/EmptyState";
import ErrorDisplay from "../@core/common/ErrorDisplay";
import LoadingSpinner from "../@core/common/LoadingSpinner";
import ReusableModal from "../@core/common/Modal";
import ReusableTable from "../@core/common/Table";
import WarningModal from "../@core/common/WarningModal";
import categoryImage from "../assets/images/categories.jpg";
import { getAllCategories } from "../utility/services/api/get/Category";
import Filters from "../views/categories-table/Filter";
import toast from "react-hot-toast";
import { deleteCategory } from "../utility/services/api/delete/Category";
import { editCategory } from "../utility/services/api/put/Category";

const CategoriesList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editName, setEditName] = useState(selectedCategory?.name);

  const toggleWarningModal = () => setWarningModalOpen(!warningModalOpen);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      limit: parseInt(searchParams.get("limit")) || 5,
      page: parseInt(searchParams.get("page")) || 1,
      name: searchParams.get("name") || "",
    };
  });

  const [debouncedFilters] = useDebounce(filters, 3000);
  const prevFiltersRef = useRef(filters);

  const [searchInput, setSearchInput] = useState(filters.name);
  const [debounceSearch] = useDebounce(searchInput, 2000);

  useEffect(() => {
    if (filters.name !== debounceSearch) {
      setFilters((prev) => ({
        ...prev,
        name: debounceSearch,
        page: 1,
      }));
    }
  }, [debounceSearch]);

  const updateURL = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();
      let hasChanges = false;

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== prevFiltersRef.current[key]) {
          params.set(key, value.toString());
          hasChanges = true;
        }
      });

      if (hasChanges) {
        navigate(
          { search: params.toString() },
          {
            replace: true,
            state: { preserveScroll: true },
          }
        );
        prevFiltersRef.current = newFilters;
      }
    },
    [navigate]
  );

  useEffect(() => {
    const stringifiedPrev = JSON.stringify(prevFiltersRef.current);
    const stringifiedCurrent = JSON.stringify(debouncedFilters);

    if (stringifiedPrev !== stringifiedCurrent) {
      updateURL(debouncedFilters);
      prevFiltersRef.current = debouncedFilters;
    }
  }, [debouncedFilters, updateURL]);

  const { name, ...restFilters } = filters;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["CATEGORIES", filters],
    queryFn: () =>
      getAllCategories({
        ...restFilters,
        ...(name?.trim() ? { name: name } : {}),
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: () => {
      toast.promise(deleteCategory(selectedCategory.id), {
        loading: "درحال پردازش",
      });
    },
    onSuccess: () => {
      toast.success("دسته بندی شما با موفقیت حذف شد");
      toggleWarningModal();
      refetch();
    },
    onError: () => toast.error("خطا !"),
  });

  const { mutate: handleEditSubmit } = useMutation({
    mutationKey: ["PUT_LOCATIONS"],
    mutationFn: () => {
      toast.promise(
        editCategory(
          {
            name: editName,
          },
          selectedCategory.id
        ),
        {
          loading: "درحال پردازش",
        }
      );
    },
    onSuccess: () => {
      toast.success("دسته بندی شما با موفقیت ویرایش شد");

      toggleEditModal();
      refetch();
    },
    onError: () => toast.error("خطا !"),
  });

  const tableData = useMemo(() => data?.data || [], [data?.data]);

  const totalPages = useMemo(() => {
    const totalCount = data?.totalCount ?? 0;
    return Math.ceil(totalCount / filters.limit) || 1;
  }, [data, filters.limit]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name !== "page" && { page: 1 }),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      name: "",
      limit: 5,
      page: 1,
    });
    setSearchInput("");
  }, []);

  const filtersComponent = useMemo(
    () => (
      <Filters
        refetch={refetch}
        filters={filters}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />
    ),
    [filters, searchInput, handleFilterChange, resetFilters]
  );

  const headers = useMemo(() => ["نام", "ویرایش", "حذف"], []);

  const renderRow = useCallback((category) => {
    return (
      <>
        <td>{category.name}</td>
        <td>
          <Button
            color="primary"
            onClick={() => {
              setSelectedCategory(category);
              setEditName(category.name);
              toggleEditModal();
            }}
          >
            ویرایش
          </Button>
        </td>
        <td>
          <Button
            color="danger"
            onClick={() => {
              setSelectedCategory(category);
              toggleWarningModal();
            }}
          >
            حذف
          </Button>
        </td>
      </>
    );
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="w-100 vh-100 d-flex gap-2">
      <ReusableTable
        pageTitle={
          <div className="d-inline-flex gap-1 align-items-center">
            <Layers size={35} />
            <h1>مدیریت دسته بندی ها</h1>
          </div>
        }
        headerStyle={{ whiteSpace: "nowrap", fontSize: "18px" }}
        headerContent={filtersComponent}
        headers={headers}
        data={tableData}
        renderRow={renderRow}
        rowKey={(category) => category.id}
        emptyState={<EmptyState onReset={resetFilters} />}
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => handleFilterChange("page", page)}
        showPagination
      />
      <div className="w-50 px-2 h-100 rounded">
        <img className="w-100 h-100 rounded" src={categoryImage} />
      </div>

      <WarningModal
        message="آیا از حذف کردن این دسته بندی مطمعنید؟"
        title="هشدار"
        isOpen={warningModalOpen}
        toggle={toggleWarningModal}
        onConfirm={handleDelete}
      />
      <ReusableModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        title="ویرایش دسته‌بندی"
        bodyContent={
          <div>
            <Input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder=""
            />
          </div>
        }
        footerActions={
          <>
            <Button color="primary" onClick={handleEditSubmit}>
              تایید
            </Button>
            <Button color="secondary" onClick={toggleEditModal}>
              لغو
            </Button>
          </>
        }
      />
    </div>
  );
};
export default CategoriesList;
