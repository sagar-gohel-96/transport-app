import csvDownload from "json-to-csv-export";
import lodash from "lodash";

interface openExportCSVProps {
  items: any;
  filename: string;
  excludeFields?: string[];
}

export const openExportCSV = (props: openExportCSVProps) => {
  const { items, excludeFields, filename } = props;

  const filterData = items.map((value: any) => {
    return lodash.omit(value, excludeFields!);
  });

  const dataToConvert = {
    data: filterData,
    filename: filename,
    delimiter: ",",
  };
  return csvDownload(dataToConvert);
};
