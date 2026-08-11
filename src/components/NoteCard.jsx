import React from "react";

import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Divider,
  Button,
  Stack,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

const NoteCard = ({
  note,
  onView,
  onDownload,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        boxShadow: "none",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              bgcolor: "#e8f4ff",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: 2,
            }}
          >
            <MenuBookIcon sx={{ color: "#0795e8" }} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={800} noWrap>
              {note.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
            >
              {note.fileName}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: 45,
            mb: 2,
          }}
        >
          {note.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 2 }}
        >
          <Chip
            size="small"
            label={note.department}
          />

          <Chip
            size="small"
            label={note.semester}
          />

          <Chip
            size="small"
            label={note.subject}
          />
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Uploaded:{" "}
          {note.date
            ? new Date(
                note.date
              ).toLocaleDateString()
            : "N/A"}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Button
            fullWidth
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => onView(note)}
            sx={{
              textTransform: "none",
            }}
          >
            View
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => onDownload(note)}
            sx={{
              bgcolor: "#0795e8",
              textTransform: "none",
            }}
          >
            Download
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NoteCard;