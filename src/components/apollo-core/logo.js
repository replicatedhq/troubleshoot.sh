import React from "react";
import styled from "@emotion/styled";
import {ReactComponent as TroubleshootLogo} from "../../../images/troubleshoot-logo-medium.svg";

const Wrapper = styled.div({
  display: "flex",
  fontSize: 24,
});

const StyledTroubleshootLogo = styled(TroubleshootLogo)({
});

export default function Logo() {
  return (
    <Wrapper>
      <StyledTroubleshootLogo />
    </Wrapper>
  );
}
