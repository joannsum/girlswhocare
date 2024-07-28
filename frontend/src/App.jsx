import { Box, Container, Button, Stack, Modal } from "@mui/material";
import { useAuth } from './hooks/useAuth';

import Login from './components/auth/Login';

import React, { useState } from 'react';
import NavBar from "@navigation/NavBar";
import SideList from "@navigation/SideList";
import PopularPosts from "@components/PopularPosts";
import CreatePost from "@components/CreatePost"; // Ensure you have this import
import "@styles/main.css";


const AppWrapper = Box;
const Main = Box;
const SideListWrapper = Box;

function App() {

  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleOpenCreatePost = () => {
    setIsCreatingPost(true);
  };

  const handleCloseCreatePost = () => {
    setIsCreatingPost(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  

  if (!user) {
    return <Login />;
  }


  return (
    <>
      <AppWrapper sx={{display: "flex", flexDirection: "column"}}>
        <NavBar user={user}/>
        <Box sx={{display: "flex", flexGrow: 1}}>
          <SideListWrapper
            sx={{
              height: "100%",
              maxWidth: "16rem",
              display: {xs: "none", md: "block"},
            }}
          >
            <SideList />
          </SideListWrapper>

          <Main sx={{flexGrow: 1}}>
            <div>
              <Stack spacing={2} alignItems="center" marginBottom={2}>
                <Button variant="contained" color="primary" onClick={handleOpenCreatePost}>
                  New Post
                </Button>
              </Stack>

              <Modal
              open={isCreatingPost}
              onClose={handleCloseCreatePost}
              aria-labelledby="create-post-modal-title"
              aria-describedby="create-post-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <CreatePost onClose={handleCloseCreatePost} />
              </Box>
            </Modal>
            </div>
            {/*<Container maxWidth="xl">
          </Container>*/}
          
            {/*testing CreatePost */}
            {/*<Container maxWidth="xl">
              <CreatePost />
        </Container>*/}
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
              }}
            >
              <PopularPosts />
            </Container>
          </Main>
        </Box>
      </AppWrapper>
    </>
  );
}

export default App;
