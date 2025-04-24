"use client";

import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { Result } from "@/types/generated"; // adjust import path as needed

type Props = {
  results: Result[];
  onEdit?: (result: Result) => void;
  onDelete?: (result: Result) => void;
};

const columns = [
  { id: "participant", label: "Participant", minWidth: 150 },
  { id: "time", label: "Time", minWidth: 100 },
  { id: "race", label: "Race", minWidth: 150 },
];

export default function RaceTable({ results, onEdit, onDelete }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuResult, setMenuResult] = React.useState<Result | null>(null);

  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    result: Result
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuResult(result);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuResult(null);
  };

  const handleEdit = () => {
    if (menuResult && onEdit) onEdit(menuResult);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (menuResult && onDelete) onDelete(menuResult);
    handleMenuClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="results table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="right"
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((result) => (
                <TableRow
                  hover
                  key={result.id}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push(
                      `/races/${new Date(Number(result.race.date)).getFullYear()}/${result.race.id}`
                    )
                  }
                >
                  <TableCell>{result.participant}</TableCell>
                  <TableCell>{formatTime(result.time)}</TableCell>
                  <TableCell>{result.race.name}</TableCell>
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <IconButton onClick={(e) => handleMenuOpen(e, result)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
}
