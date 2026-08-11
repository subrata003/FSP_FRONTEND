import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderIcon from "@mui/icons-material/Folder";
import DownloadIcon from "@mui/icons-material/Download";

const ViewNoteDialog = ({
  note,
  onClose,
  onDownload,
}) => {
  return (
    <Dialog
      open={Boolean(note)}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      {note && (
        <>
          <DialogTitle sx={{ fontWeight: 800 }}>
            {note.title}
          </DialogTitle>

          <DialogContent>
            <List>

              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon color="primary" />
                </ListItemIcon>

                <ListItemText
                  primary="Description"
                  secondary={note.description}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>

                <ListItemText
                  primary="Department"
                  secondary={note.department}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>

                <ListItemText
                  primary="Semester"
                  secondary={note.semester}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>

                <ListItemText
                  primary="Subject"
                  secondary={note.subject}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <FolderIcon color="primary" />
                </ListItemIcon>

                <ListItemText
                  primary="File"
                  secondary={note.fileName}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <DownloadIcon color="primary" />
                </ListItemIcon>

                <ListItemText
                  primary="Downloads"
                  secondary={note.downloads || 0}
                />
              </ListItem>

            </List>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={onClose}>
              Close
            </Button>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() => onDownload(note)}
              sx={{
                bgcolor: "#0795e8",
              }}
            >
              Download
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ViewNoteDialog;