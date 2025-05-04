import React, { ReactNode } from "react";

// Table Root component
interface TableRootProps {
  children: ReactNode;
  className?:string;
}

const TableRoot: React.FC<TableRootProps> = ({ children,className }) => {
  return <table className={`table ${className}`}>{children}</table>;
};

// Table Header component
interface TableHeaderProps {
  children: ReactNode;
  className?:string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children,className }) => {
  return <thead className={`table-header ${className}`}>{children}</thead>;
};

// Table Body component
interface TableBodyProps {
  children: ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody className="table-body">{children}</tbody>;
};

// Table Row component
interface TableRowProps {
  children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <tr className="table-row">{children}</tr>;
};

// Table Header Cell component
interface TableHeaderCellProps {
  children: ReactNode;
  customClass?: string;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  customClass,
}) => {
  return <th className={`table-row-header-cell ${customClass}`}>{children}</th>;
};

// Table Cell component
interface TableCellProps {
  children: ReactNode;
  customClass?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, customClass }) => {
  return <td className={`table-cell ${customClass}`}>{children}</td>;
};

// Exporting each component separately
export {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
};
