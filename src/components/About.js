import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
} from "@chakra-ui/react";
import ProfileArray from "./ProfileArray";

import { Flex } from "@chakra-ui/react";
export default function About({ color }) {
  const profile = ProfileArray();
    return (
      <>
        <Container maxW={"3xl"} id="about">
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            pb={{ base: 20, md: 36 }}
          >

            <Stack align="center" direction="row" px={4}>
              <HStack mx={4}>
                <Text color={`${color}.400`} fontWeight={800}>
                  01
                </Text>
                <Text fontWeight={800}>About</Text>
              </HStack>
              <Divider orientation="horizontal" />
            </Stack>
            <Flex direction={{ base: "column", md: "row" }} alignItems="center" px={0}>
              <img src="/images/profile.png" alt="Profile pic" width="300" height="400" style={{ marginRight: "10px", marginTop: "-60px" }} />
              <Text color={"gray.600"} fontSize={"xl"}>
                {profile.about}
              </Text>
            </Flex>
          </Stack>
        </Container>
      </>
    );
}

