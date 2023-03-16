import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// component
import { InfoBox, Loading, AddressBox, Friends } from "../../components";

export interface UniqueUserProps {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  jobDescriptor: string;
  jobArea: string;
  jobType: string;
  email: string;
  ip: string;
  imageUrl: string;
  company: {
    name: string;
    suffix: string;
  };
  address: {
    zipCode: string;
    city: string;
    streetAddress: string;
    country: string;
    state: string;
  };
}

function UniqueUser() {
  //
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UniqueUserProps | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.userId}`
      )
      .then((resp) => {
        setUser(resp.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading || !user) {
    // Check if `user` is null before rendering
    return <Loading />;
  }

  return (
    <Container>
      <Header>
        <ImageBox>
          <Image src={`${user.imageUrl}?v=${params.userId}`} alt="user" />
        </ImageBox>
        {/* InfoBox Component */}
        <InfoBox user={user} />
        {/* AddressBox Component */}
        <AddressBox user={user} />
      </Header>
      {/* Friends Component */}
      <Friends />
    </Container>
  );
}

export default UniqueUser;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  border: 1px solid #ccc;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: unset;

  @media screen and (min-width: 990px) {
    flex-direction: row;
    align-items: center;
  }
`;

// image box styles
const ImageBox = styled.div`
  width: 100%;
  @media screen and (min-width: 990px) {
    width: auto;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  @media screen and (min-width: 990px) {
    width: auto;
  }
`;
