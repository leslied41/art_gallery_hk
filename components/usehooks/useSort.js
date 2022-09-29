import { useMemo } from "react";

const useSort = (list, order) => {
  const sorted_list = useMemo(
    () =>
      typeof order !== "boolean"
        ? list.sort(function (a, b) {
            let dateA = new Date(a._createdAt).getTime();
            let dateB = new Date(b._createdAt).getTime();
            return dateA - dateB;
          })
        : order
        ? list.sort(function (a, b) {
            let dateA = new Date(a.publication_time).getTime();
            let dateB = new Date(b.publication_time).getTime();
            return dateB - dateA;
          })
        : list.sort(function (a, b) {
            let dateA = new Date(a.publication_time).getTime();
            let dateB = new Date(b.publication_time).getTime();
            return dateA - dateB;
          }),
    [list, order]
  );

  return sorted_list;
};

export default useSort;
