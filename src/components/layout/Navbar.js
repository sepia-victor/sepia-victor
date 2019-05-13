import React from 'react';
import { Flex, Link, Text, Icon, FormField, Input, BackgroundImage, Box, Label, Heading } from 'pcln-design-system';

export default function Navbar() {
  return (
<div>
    <BackgroundImage
  image='https://www.gsg-cpa.com/wp-content/uploads/2019/01/parking-lot.jpg'>
  <Box p={4}>
    <Link href='/'>
    <Heading
    pl={8}
      fontSize={8}
      align='center'
      color='yellow'
      textShadow='#FC0 1px 0 10px'
      >
      Grab That Spot

    </Heading>
    </Link>
  </Box>
</BackgroundImage>

      <Text ml="auto" mr={4}>
        <FormField>
          <Icon name="Search" size="20" />
          <Input size='4' id="location" name="location" placeholder="location" />
        </FormField>
      </Text>




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
