// SkeletonTable.js
import React from 'react';
import { TableRow, TableCell, Skeleton } from '@mui/material';

const SkeletonTable = ({ columns, rows = 10 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" width={`${Math.random() * (80 - 50) + 50}%`} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTable;
