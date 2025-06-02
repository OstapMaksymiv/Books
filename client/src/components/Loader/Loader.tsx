import { Typography } from "@mui/material";
const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="loading-block">
      {!isLoading ? (
        <Typography component="span" className="loader"></Typography>
      ) : (
        <Typography component="p" color="error" fontWeight="bold">
          Something went wrong. Please try again later.
        </Typography>
      )}
    </div>
  );
};

export default Loader;
