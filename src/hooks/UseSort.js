const useSort = (content = []) => {
  const compare = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  };
  content.sort(compare);
};

export default useSort;
