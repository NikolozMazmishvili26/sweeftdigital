import styled from "styled-components";

// import interfaces
import { UsersProps } from "../../pages/Users/Users";

interface UserProps {
  user: UsersProps;
}

function User({ user }: UserProps) {
  //
  const { id, imageUrl, lastName, name, prefix, title } = user;

  return (
    <Card>
      <CardContent>
        <Image src={`${imageUrl}?id=${id}`} alt={name} />
        <DescriptionBox>
          <FullName>{prefix + " " + name + " " + lastName}</FullName>
          <Title>{title}</Title>
        </DescriptionBox>
      </CardContent>
      {/*  */}
      {/* {isLoading && <Loading>Loading...</Loading>}
      {!isLoading && hasMore && <p>Scroll down to load more</p>}
      {!isLoading && !hasMore && <Loading>No more users to load</Loading>} */}
    </Card>
  );
}

export default User;

const Card = styled.div`
  width: 50%;
  @media screen and (min-width: 1000px) {
    width: 25%;
  }
`;

const CardContent = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const DescriptionBox = styled.div`
  width: 100%;
  word-wrap: break-word;
`;

const FullName = styled.h2`
  padding: 2px 10px;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const Title = styled.p`
  padding: 2px 10px;
  font-size: 16px;
  line-height: 20px;
`;

const LoadingContainer = styled.div``;
