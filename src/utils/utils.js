export const formatCsvData = (data) => {
  if (!data) return [];

  return data.map((row) => {
    const formattedRow = {};
    for (let key in row) {
      formattedRow[key.trim()] = row[key].trim();
    }
    return formattedRow;
  });
};

export const compareData = (csvData, prnData) => {
  let csvFormatedData = [
    Object.keys(csvData[0]),
    ...csvData.map((obj) => {
      return Object.keys(obj).map((key) => obj[key]);
    }),
  ].map((el) => el.join(" "));

  let prnFormatData = [];
  prnData?.map((el) => {
    if (el[0]) {
      prnFormatData.push(el[0].trim().replace(/\s+/g, " "));
    }
  });

  if (JSON.stringify(csvFormatedData) === JSON.stringify(prnFormatData)) {
    alert("Data is identical.");
  } else {
    alert("Data is  not identical");
  }
};
