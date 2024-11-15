import { PropagateLoader } from "react-spinners";

const loader = () => {
  return (
    <div>
      <PropagateLoader
        color="grey"
        loading
        margin={5}
        size={40}
        speedMultiplier={1}
        cssOverride={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"300px"
        }}
      />
    </div>
  );
};

export default loader;
