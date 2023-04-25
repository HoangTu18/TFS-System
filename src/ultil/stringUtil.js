export const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const searchByName = (listData, query, field1, field2 = "") => {
  const searchWithoutAccents = removeAccents(query);
  const searchRegex = new RegExp(searchWithoutAccents, "i");
  return listData?.filter((obj) => {
    // console.log(obj[field1]);
    return searchRegex.test(
      removeAccents(
        field2 === ""
          ? obj[field1] === null
            ? ""
            : obj[field1]
          : obj[field1][field2]
      )
    );
  });
};

export const searchByPhoneNumber = (listData, query, name, name2) => {
  const searchRegex = new RegExp(query, "i");
  return listData.filter((obj) => {
    if (!obj[name]) {
      return obj;
    }
    return searchRegex.test(obj[name][name2]);
  });
};

export const truncateString = (str, maxLength) => {
  if (str !== null) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength).trim() + "...";
    }
  }
  return str;
};
