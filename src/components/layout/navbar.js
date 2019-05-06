import React from 'react';
import DrawerToggleButton from './DrawerToggleButton'
// import { Flex, Text, Icon, FormField, Input } from 'pcln-design-system'

// export default function Navbar() {
//   return (
//     <Flex color="black" bg="lightBlue" p={2} alignItems="center">
//       <Text bold mx={4}>
//         Grab That Spot
//       </Text>
//       <Text ml="auto" mr={4}>
//         <FormField>
//           <Icon name="Parking" size="20" />
//           <Input id="location" name="location" placeholder="location" />
//         </FormField>
//       </Text>
//     </Flex>
//   );
// }



import './Navbar.css'

const navbar = props => (
  <header className="navbar">
    <nav className="navbar__navigation">
    <div className="navbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
      <div className="navbar__logo">
        <a href="/">THE LOGO</a>
      </div>
      <div className="spacer" />
      <div className="navbar_navigation-items">
        <ul>
          <li>
            <a href="/">Products</a>
          </li>
          <li>
            <a href="/">Users</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default navbar