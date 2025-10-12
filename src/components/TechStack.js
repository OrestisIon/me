import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Image,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { Fade } from "react-reveal";
import TechStackArray from "./TechStackArray";

export default function TechStack({ color }) {
  const techStack = TechStackArray();

  return (
    <>
      <Container maxW={"3xl"} id="techstack">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                02
              </Text>
              <Text fontWeight={800}>Tech Stack</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Center px={4}>
            <SimpleGrid columns={[3, 4, 6]} spacing={8}>
              {techStack.map((tech) => (
                <Fade bottom key={tech.name}>
                  <Box
                    p={4}
                    borderRadius="lg"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{
                      borderColor: `${color}.400`,
                      transform: "translateY(-4px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Image
                      src={tech.image}
                      h={16}
                      w={16}
                      objectFit="contain"
                      mx="auto"
                      mb={2}
                    />
                    <Text fontSize="sm" fontWeight={500}>
                      {tech.name}
                    </Text>
                  </Box>
                </Fade>
              ))}
            </SimpleGrid>
          </Center>
        </Stack>
      </Container>
    </>
  );
}
