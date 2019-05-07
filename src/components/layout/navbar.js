import React from 'react';
import { Flex, Text, Icon, FormField, Input } from 'pcln-design-system';

export default function Navbar() {
  return (
    <Flex color="black" bg="lightBlue" p={2} alignItems="center">
      <Text bold mx={4}>
        Grab That Spot
      </Text>
      <Text ml="auto" mr={4}>
        <FormField>
          <Icon name="Parking" size="20" />
          <Input id="location" name="location" placeholder="location" />
        </FormField>
      </Text>
    </Flex>
  );
}
