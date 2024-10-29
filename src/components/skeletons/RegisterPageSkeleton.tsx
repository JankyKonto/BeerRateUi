import { Box, Skeleton } from "@mui/material";

const RegisterPageSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        sx={{ marginBottom: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        sx={{ marginBottom: 4 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        sx={{ marginBottom: 4 }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        sx={{ marginBottom: 4 }}
      />
      <Skeleton
        variant="rectangular"
        height={40}
        width="100%"
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
};

export default RegisterPageSkeleton;
