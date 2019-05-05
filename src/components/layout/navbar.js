import React from 'react';
import { Flex, Text, Icon, FormField, Input } from 'pcln-design-system';

export default function Navbar() {
  return (
    <Flex color="white" bg="blue" p={2} alignItems="center">
      <Text bold mx={4}>
        Grab That Spot
      </Text>
      <FormField ml="auto" mr={4}>
        <Icon name="Parking" size="20" />
        <Input id="location" name="location" placeholder="location" />
      </FormField>
    </Flex>
  );
}
