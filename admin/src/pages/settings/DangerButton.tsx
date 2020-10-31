import { styled } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const dangerColor = "#cb2431";

const DangerButton = styled(Button)({
  background: "white",
  borderRadius: 4,
  color: dangerColor,
  "&:hover": {
    backgroundColor: dangerColor,
    color: "white",
  },
});

export default DangerButton;
