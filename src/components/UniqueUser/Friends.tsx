import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

// import interface
import { breadcrumbsProps } from "../../App";

// import components
import { Loading, User } from "../../components";

// import styled components
import { Container, UsersProps } from "../../pages/Users/Users";

interface FriendsComponentProps {
  userId: string | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  breadcrumbs: breadcrumbsProps[];
  setBreadcrumbs: React.Dispatch<React.SetStateAction<breadcrumbsProps[]>>;
}

function Friends({
  userId,
  page,
  setPage,
  breadcrumbs,
  setBreadcrumbs,
}: FriendsComponentProps) {
  //
  const [friends, setFriends] = useState<UsersProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/20`
      )
      .then((res) => {
        setFriends([...friends, ...res.data.list]);
        setHasMore(res.data.pagination.nextPage !== null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, hasMore]);

  const handleScroll = () => {
    if (isLoading || !hasMore) return;
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <FriendsContainer>
      <Breadcrumbs>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLastBreadcrumb = index === breadcrumbs.length - 1;
          return (
            <>
              <BreadcrumbsLink to={breadcrumb.to}>
                {breadcrumb.name}
              </BreadcrumbsLink>
              {!isLastBreadcrumb && " > "}
            </>
          );
        })}
      </Breadcrumbs>
      <FriendsTitle>Friends:</FriendsTitle>
      <Container>
        {friends.map((friend) => {
          return (
            <User
              key={friend.id}
              user={friend}
              breadcrumbs={breadcrumbs}
              setBreadcrumbs={setBreadcrumbs}
            />
          );
        })}
        {isLoading ? <Loading /> : null}
      </Container>
    </FriendsContainer>
  );
}

export default Friends;

const FriendsContainer = styled.div``;

const Breadcrumbs = styled.div`
  padding: 20px;
  display: flex;
  column-gap: 6px;
  flex-wrap: wrap;
  row-gap: 7px;
`;

const BreadcrumbsLink = styled(Link)``;

const FriendsTitle = styled.h2`
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0px 20px 10px;
`;
