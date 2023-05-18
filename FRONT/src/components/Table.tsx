import React from 'react';
import '../styles/table.css';
import { Button } from '@mui/material';

interface TableColumn {
  heading: string;
  value: string;
}

interface TableProps {
  data: any[];
  column: TableColumn[];
}

interface TableHeadItemProps {
  item: TableColumn;
}

interface TableRowProps {
  item: any;
  column: TableColumn[];
}

const Table: React.FC<TableProps> = ({ data, column }) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem key={index} item={item} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} item={item} column={column}/>
        ))}
        
      </tbody>
    </table>
  );
};

const TableHeadItem: React.FC<TableHeadItemProps> = ({ item }) => (
  <th>{item.heading}</th>
);

const TableRow: React.FC<TableRowProps> = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      if (columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.');
        return <td key={index}>{item[itemSplit[0]][itemSplit[1]]}</td>;
      }
      return <td key={index}>{item[columnItem.value]}</td>;
    })}
    <td>
      <Button variant='contained' color='error'>Delete</Button>
    </td>
  </tr>
);

export default Table;


