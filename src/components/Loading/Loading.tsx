import styled from "styled-components";

// import loading gif

import loading from "../../assets/loading.gif";

function Loading() {
  return (
    <LoadingContainer>
      <LoadingGif src={loading} alt="loading" />
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  margin: auto;
  left: 50%;
  margin-top: 35px;
  margin-bottom: 60px;
`;

const LoadingGif = styled.img``;
