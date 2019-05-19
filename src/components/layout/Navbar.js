import React from 'react';
import fireApp from '../../fire'
import {
  Flex,
  Link,
  Text,
  Icon,
  FormField,
  Input,
  BackgroundImage,
  Box,
  Label,
  Heading
} from 'pcln-design-system';

export default function Navbar() {
  return (
    <div>
      <BackgroundImage image="https://www.gsg-cpa.com/wp-content/uploads/2019/01/parking-lot.jpg">
        <Box p={4}>
          <Link href="/">
            <Heading
              pl={8}
              fontSize={8}
              align="center"
              color="yellow"
              textShadow="#FC0 1px 0 10px"
            >
              <span style={{ textShadow: '#001833 2px 2px' }}>
                Grab That Spot
              </span>
            </Heading>
          </Link>
        </Box>
      </BackgroundImage>

      <Flex wrap p={2} align="center" color="white" bg="blue">
        <Text bold mx={2}>
          An App To Help You Find Parking
        </Text>

        <Text ml="auto" mr={2} pr={4}>
          <Link href="/maps" color="white" ml={3}>
            Map
          </Link>
          {/* </Text> */} • {/* <Text ml="auto" mr={2}> */}
          <Link href="/auctions" color="white" ml={3}>
            Auctions
          </Link>
                    {/* </Text> */} • {/* <Text ml="auto" mr={2}> */}
          <Link href="/addAuction" color="white" ml={3}>
            Add New Auction
          </Link>
          {/* </Text> */} • {/* <Text ml="auto" mr={2}> */}
          <Link href="/" onClick={()=>fireApp.auth().signOut()} color="white" ml={3}>
            Logout
          </Link>
        </Text>
      </Flex>

      {/* <Text ml="auto" mr={4}>
        <FormField>
          <Icon name="Search" size="20" />
          <Input size='4' id="location" name="location" placeholder="location" />
        </FormField>
      </Text> */}

      {/* <Flex color="black" bg="lightBlue" p={2} alignItems="center">
      <Text bold mx={4}>
        Grab That Spot
      </Text>
      <Text ml="auto" mr={4}>
        <FormField>
          <Icon name="Search" size="20" />
          <Input id="location" name="location" placeholder="location" />
        </FormField>
      </Text>
    </Flex> */}
    </div>
  );
}
