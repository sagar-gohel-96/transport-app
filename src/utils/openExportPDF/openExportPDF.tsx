import pdfMake from "pdfmake/build/pdfmake";
import lodash from "lodash";
import { Formatter } from "../../utils/formatter";
import { PageOrientation } from "pdfmake/interfaces";
import pdfFonts from "pdfmake/build/vfs_fonts";

interface FieldNames {
  key: string;
  value: string;
}

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface ExportPDFProps<T> {
  items: T[];
  title: string;
  dateFields?: string[];
  dateFormat?: string;
  currencyFields?: string[];
  exculdeFields?: string[];
  includeFields?: string[];
  percentFields?: string[];
  decimalFields?: string[];
  timeFields?: string[];
  fieldNames?: FieldNames[];
  currencyCode?: string;
}
interface FinalData {
  title: string[];
  data: { [key: string]: string }[];
}

export async function openExportPDF<T>(props: ExportPDFProps<T>) {
  const {
    items,
    title,
    dateFields,
    currencyFields,
    exculdeFields,
    includeFields,
    percentFields,
    decimalFields,
    currencyCode,
    fieldNames,
  } = props;
  const keys =
    includeFields && !includeFields?.includes("all")
      ? includeFields
      : lodash.uniq(
          lodash.flatten(
            lodash.map(items, (item) => Object.keys(item as Object))
          )
        );
  const getValue = (item: { [x: string]: any }, key: string): string => {
    if (dateFields?.includes(key)) {
      return item[key];
    } else if (currencyFields?.includes(key)) {
      return Formatter.formatCurrency(item[key], currencyCode ?? "USD", 2);
    } else if (percentFields?.includes(key)) {
      return Formatter.formatPercent(item[key], 2);
    } else if (decimalFields?.includes(key)) {
      return Formatter.formatDecimal(item[key], 2);
    } else if (exculdeFields?.includes(key)) {
      return "";
    } else if (lodash.isObject(item[key])) {
      return JSON.stringify(item[key]);
    } else {
      if (lodash.isNumber(item[key])) {
        return !item[key] ? String(0) : item[key].toString();
      }
      return !!item[key] ? item[key].toString() : "";
    }
  };

  const getColumnName = (key: string) => {
    if (!!fieldNames && fieldNames.length > 0) {
      return fieldNames.findIndex((item) => item.key === key) > -1
        ? (fieldNames.find((f) => f.key === key)?.value as string)
        : key;
    }
    return lodash.upperCase(key.split("_").join(" "));
  };

  const columnsData: FinalData = {
    title: keys.map((key) => key),
    data: lodash.map(items, (i) => {
      const values = Object.entries(i as any).reduce(
        (acc: { [x: string]: string }, [key]) => {
          acc[key] = getValue(i as any, key);
          return acc;
        },
        {}
      );
      return lodash.pick(values, keys);
    }),
  };

  const tableData: string[][] = [];
  tableData.push(columnsData.title.map(getColumnName));
  columnsData.data.forEach((item) => {
    const row: string[] = [];
    columnsData.title.forEach((key) => {
      if (item[key] === undefined || item[key] === null) {
        row.push("");
      } else {
        row.push(item[key]);
      }
    });
    tableData.push(row);
  });
  const docDefinition = {
    content: [
      { text: title, style: "header" },
      {
        style: "table",
        table: {
          body: tableData,
        },
        layout: {
          fillColor: function (rowIndex: number) {
            return rowIndex === 0 ? "#ddd" : "white";
          },
        },
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
      },
      table: {
        fontSize: 8,
      },
    },
    pageOrientation: "landscape" as PageOrientation,
  };
  pdfMake.createPdf(docDefinition).open();
}
