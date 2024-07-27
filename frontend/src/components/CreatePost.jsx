import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const CreatePost = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleMediaChange = (e) => setMedia(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, media });
    setTitle('');
    setContent('');
    setMedia(null);
    onClose();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Create a New Post
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              required
            />
            <TextField
              label="Content"
              variant="outlined"
              value={content}
              onChange={handleContentChange}
              fullWidth
              multiline
              rows={4}
              required
            />
            <Button
              variant="contained"
              component="label"
            >
              Upload Media
              <input
                type="file"
                hidden
                onChange={handleMediaChange}
              />
            </Button>
            {media && <Typography variant="body2">{media.name}</Typography>}
          </Stack>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default CreatePost;
