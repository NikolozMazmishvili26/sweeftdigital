import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

// import components
import { Loading, User } from "../../components";

//
const PAGE_NUMBER = 1;
const SIZE = 20;

export interface UsersProps {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
}

function Users() {
  //
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${SIZE}`
      )
      .then(async (res) => {
        await setUsers([...users, ...res.data.list]);
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
    <Container>
      {users.map((user) => {
        return <User key={user.id} user={user} />;
      })}
      {isLoading ? <Loading /> : null}
    </Container>
  );
}

export default Users;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;
