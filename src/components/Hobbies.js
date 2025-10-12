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
                        In addition to my professional pursuits, I am deeply passionate about leading a healthy and active lifestyle. For the past two years, I have been dedicated to bodybuilding, embarking on a journey of self-training and self-improvement. Recently, I've also delved into the thrilling world of Rugby, which not only keeps me physically active but also nurtures teamwork and camaraderie. My commitment to holistic wellness extends to a keen interest in healthy nutrition. I firmly believe that a balanced diet is the foundation of a vibrant life. Through personalized training programs, I strive to empower individuals to enhance not only their physical capabilities but their overall quality of life, guided by careful dieting protocols. These hobbies not only bring joy and fulfillment to my life but also fuel my dedication to helping others achieve their fitness and well-being goals.

                    </Text>
                </Stack>
            </Container>
        </>
    );
}

