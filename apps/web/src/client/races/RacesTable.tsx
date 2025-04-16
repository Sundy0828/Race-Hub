"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Race } from "@/types/generated";

type Props = {
  races: Race[];
  onEdit?: (race: Race) => void;
  onDelete?: (race: Race) => void;
};

const columns = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "location", label: "Location", minWidth: 150 },
  { id: "date", label: "Date", minWidth: 120 },
];

export default function RacesTable({ races, onEdit, onDelete }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuRace, setMenuRace] = React.useState<Race | null>(null);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, race: Race) => {
    setAnchorEl(event.currentTarget);
    setMenuRace(race);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRace(null);
  };

  const handleEdit = () => {
    if (menuRace && onEdit) onEdit(menuRace);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (menuRace && onDelete) onDelete(menuRace);
    handleMenuClose();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="races table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {races
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((race) => (
                <TableRow
                  hover
                  key={race.id}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push(
                      `/races/${new Date(Number(race.date)).getFullYear()}/${race.id}`
                    )
                  }
                >
                  <TableCell>{race.name}</TableCell>
                  <TableCell>{race.location}</TableCell>
                  <TableCell>
                    {race.date
                      ? new Date(Number(race.date)).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "Unknown"}
                  </TableCell>
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <IconButton onClick={(e) => handleMenuOpen(e, race)}>
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
        count={races.length}
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
