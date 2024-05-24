import { View } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import { Link, Heading, Flex } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';

function Nav() {
  useEffect(() => {
    getUser();
  }, []);
  const [userId, setUserId] = useState("")

  function getUser() {
    getCurrentUser().then((value) => {
      setUserId(value?.userId)
    }, (reason) => {
      console.error(reason)
    })
  }
  return (
    <View backgroundColor={'aliceblue'} margin={'auto'} padding={'20px'}>
      <Flex justifyContent={'space-between'} margin={'auto'}>
        <Link href="/" padding={'10px'}>
          <Heading level={4}>
            math generator
          </Heading>
        </Link>
        <Link href="/me" padding={'10px'}>
          {userId ? "My profile" : "Login"}
        </Link>
      </Flex>
    </View>
  );
}

export default Nav;
