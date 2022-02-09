import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function DataTable({ items, columns }) {
  if (items.length > 0) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="reqRow">
              {columns.map((col) => {
                return (
                  <TableCell style={{ fontWeight: "bold" }} key={col.id}>
                    {col.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((element) => {
              return (
                <TableRow>
                  {columns.map((c) => {
                    return (
                      <TableCell key={c.id}>
                        {c.renderContent(element)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <p>Request is empty, Nothing to display...</p>;
  }
}

export default DataTable;
