import { Box, Container } from "@mui/material";
import { NewUserForm } from "../../shared/forms/new-user-form";

const NewUserPage = () => {
  return (
    <Container maxWidth="xl">
      <Box p={3}>
        <NewUserForm
          onSubmit={(values) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve();
              }, 1000);
            });
          }}
        />
      </Box>
    </Container>
  );
};

export { NewUserPage };
