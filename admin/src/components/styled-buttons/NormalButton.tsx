import { styled } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const scoreColor = "#00BFFF";

const NormalButton = styled(Button)({
  background: "white",
  borderRadius: 4,
  color: scoreColor,
  "&:hover": {
    backgroundColor: scoreColor,
    color: "white",
  },
});

export default NormalButton;
