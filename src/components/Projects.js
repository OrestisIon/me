import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Heading,
  SimpleGrid,
  Badge,
  Link,
  Center,
} from "@chakra-ui/react";
import { Fade } from "react-reveal";
import { useState, useRef } from "react";
import ProjectsArray from "./ProjectsArray";
import OtherProjectsArray from "./OtherProjectsArray";
import TagsArray from "./TagsArray";
import React from 'react';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';

export default function Projects({ color }) {
  const projects = ProjectsArray();
  const others = OtherProjectsArray();
  const options = TagsArray("ProjectsTags");
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const [selected, setSelected] = useState("All");
  const handleSelected = (value) => {
    setSelected(value);
  };
  const handleHorizantalScroll = (element, speed, distance, step) => {
    console.log(element);
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };
  
    
return (
    <>
      <Container maxW={"3xl"} id="projects">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                03
              </Text>
              <Text fontWeight={800}>Projects</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack px={4} spacing={4}>
            {projects.map((project) => (
              <Fade bottom>
                <Card
                  key={project.name}
                  direction={{
                    base: "column",
                  }}
                  overflow="hidden"
                >
                  <Image objectFit="contain" src={project.image} w="100%" h="300" />

                  <Stack>
                    <CardBody align="left" p={2}>
                      <Heading size="md">{project.name}</Heading>

                      <Text py={2}>{project.description}</Text>

                      <HStack py={2}>
                        {project.buttons.map((button) => (
                          <a key={button.text} href={button.href}>
                            <Button color={`${color}.400`}>
                              {button.text}
                            </Button>
                          </a>
                        ))}
                      </HStack>
                      <HStack pt={4} spacing={2}>
                        {project.badges.map((badge) => (
                          <Badge
                            key={badge.text}
                            colorScheme={badge.colorScheme}
                          >
                            {badge.text}
                          </Badge>
                        ))}
                      </HStack>
                    </CardBody>
                  </Stack>
                </Card>
              </Fade>
            ))}
          </Stack>
          <Text color={"gray.600"} fontSize={"xl"} px={4}>
            Other Projects
          </Text>
        <Center px={4}>

          <Button
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 10, 100, -10);
            }}
            disabled={arrowDisable}
            colorScheme="blue" // Adjust the color scheme as needed
            id='left-arrow'
            mr={2} // Add margin to the right of the button
          >
            <ArrowLeftIcon />
          </Button>   
          <div
              style={{
                display: 'flex',
                overflowY: 'hide', // Hide horizontal scrollbar
              width: '1000px',
              overflowX: 'scroll',
              whitespace: 'nowrap',
                
            }}
           
              ref={elementRef}
          >
            
              <ButtonGroup variant="outline" ref={elementRef} >
              <Button
                colorScheme={selected === "All" ? `${color}` : "gray"}
                onClick={() => handleSelected("All")}
              >
                All
              </Button>
              {options.map((option) => (
                <Button
                  colorScheme={selected === option.value ? `${color}` : "gray"}
                  onClick={() => handleSelected(option.value)}
                >
                  {option.value}
                </Button>
              ))}
              </ButtonGroup>
          </div>
          <Button
            id='right-arrow'
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 10, 100, 10);
            }}
            colorScheme="blue" // Adjust the color scheme as needed
            ml={2} // Add margin to the left of the button
          >
            <ArrowRightIcon />
          </Button>

          
            </Center>
          <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
            {others
              .filter((other) => {
                if (selected === "All") {
                  return true;
                } else {
                  return other.tags.includes(selected);
                }
              })
              .map((other) => (
                <Fade bottom>
                  <Card key={other.name}>
                    <Stack>
                      <CardBody align="left" h={[null, "40vh"]}>
                        <Heading size="sm">{other.name}</Heading>

                        <Text fontSize="sm" py={2}>
                          {other.description}
                        </Text>

                        <HStack spacing={2}>
                          {other.buttons.map((button) => (
                            <Link
                              key={button.text}
                              href={button.href}
                              color={`${color}.400`}
                            >
                              {button.text}
                            </Link>
                          ))}
                        </HStack>
                        <HStack flexWrap="wrap" pt={4} spacing={2}>
                          {other.badges.map((badge) => (
                            <Badge
                              my={2}
                              key={badge.text}
                              colorScheme={badge.colorScheme}
                            >
                              {badge.text}
                            </Badge>
                          ))}
                        </HStack>
                      </CardBody>
                    </Stack>
                  </Card>
                </Fade>
              ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}


