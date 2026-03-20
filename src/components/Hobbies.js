import {
    Divider,
    Stack,
    Text,
    Container,
    Box,
    HStack,
} from "@chakra-ui/react";

export default function Hobbies({ color }) {
    return (
        <>
            <Container maxW={"3xl"} id="hobbies">
                <Stack
                    as={Box}
                    textAlign={"center"}
                    spacing={{ base: 8, md: 14 }}
                    pb={{ base: 20, md: 36 }}
                >
                    <Stack align="center" direction="row" px={4}>
                        <HStack mx={4}>
                            <Text color={`${color}.400`} fontWeight={800}>
                                04
                            </Text>
                            <Text fontWeight={800}>Hobbies</Text>
                        </HStack>
                        <Divider orientation="horizontal" />
                    </Stack>
                    <Text color={"gray.600"} fontSize={"xl"} px={4}>
                        Outside of work, I am driven by a deep passion for fitness, nutrition, nature, and travel. I have dedicated years to bodybuilding and strength training, constantly pushing my limits and refining my approach to physical performance. I believe that what you eat is just as important as how you train — nutrition is a subject I study carefully and apply with discipline. Beyond the gym, I find balance and inspiration in the natural world. Whether hiking through rugged landscapes or simply spending time outdoors, nature keeps me grounded. Travel is another core passion — exploring new cultures, cuisines, and environments fuels my curiosity and broadens my perspective in ways that complement both my personal and professional growth.
                    </Text>
                </Stack>
            </Container>
        </>
    );
}

