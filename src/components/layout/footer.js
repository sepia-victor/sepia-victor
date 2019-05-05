import React from 'react';
import { Flex, Text } from 'pcln-design-system';

export default function Footer() {
  return (
    <Flex color="white" bg="blue" p={2}>
      <Text mx={4}>Copyright &copy; {new Date().getFullYear()}</Text>
      <Text ml="auto" mr={4}>
        GrabThatSpot
      </Text>
    </Flex>
  );
}
