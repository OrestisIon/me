import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  saveAccessRequest,
  verifyAccessCode,
  setCurrentUser,
} from "../utils/accessStorage";

export default function AccessControl({ onAccessGranted, color }) {
  const [accessCode, setAccessCode] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    region: "",
    company: "",
    linkedIn: "",
  });
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = verifyAccessCode(accessCode);

    if (result.isValid) {
      const user = {
        isAdmin: result.isAdmin,
        ...(result.isAdmin
          ? { fullName: "Admin" }
          : { fullName: result.user.fullName, email: result.user.email }),
      };
      setCurrentUser(user);
      toast({
        title: "Access Granted",
        description: result.isAdmin
          ? "Welcome, Admin!"
          : "Welcome! You now have access to the portfolio.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onAccessGranted(user);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid access code. Please try again or request access.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRequestAccess = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.region ||
      !formData.company
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    saveAccessRequest(formData);

    toast({
      title: "Request Submitted",
      description:
        "Your access request has been submitted. You will receive an email with your access code once approved.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setFormData({
      fullName: "",
      email: "",
      region: "",
      company: "",
      linkedIn: "",
    });
  };

  return (
    <Box
      bg="gray.900"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="md">
        <VStack spacing={8}>
          <VStack spacing={2}>
            <Heading size="xl" color="white">
              Portfolio Access
            </Heading>
            <Text color="gray.400" textAlign="center">
              This portfolio is restricted. Please enter your access code or
              request access.
            </Text>
          </VStack>

          <Box
            bg="gray.800"
            p={8}
            borderRadius="lg"
            width="100%"
            boxShadow="xl"
          >
            <Tabs isFitted variant="enclosed" colorScheme={color}>
              <TabList mb={4}>
                <Tab color="gray.400" _selected={{ color: "white", bg: `${color}.500` }}>
                  Enter Code
                </Tab>
                <Tab color="gray.400" _selected={{ color: "white", bg: `${color}.500` }}>
                  Request Access
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <form onSubmit={handleLogin}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel color="white">Access Code</FormLabel>
                        <Input
                          type="text"
                          value={accessCode}
                          onChange={(e) =>
                            setAccessCode(e.target.value.toUpperCase())
                          }
                          placeholder="Enter your access code"
                          bg="gray.700"
                          color="white"
                          border="none"
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        colorScheme={color}
                        width="100%"
                        size="lg"
                      >
                        Access Portfolio
                      </Button>
                    </VStack>
                  </form>
                </TabPanel>

                <TabPanel>
                  <form onSubmit={handleRequestAccess}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel color="white">Full Name</FormLabel>
                        <Input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          placeholder="John Doe"
                          bg="gray.700"
                          color="white"
                          border="none"
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel color="white">Email</FormLabel>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="john@example.com"
                          bg="gray.700"
                          color="white"
                          border="none"
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel color="white">Region</FormLabel>
                        <Input
                          type="text"
                          value={formData.region}
                          onChange={(e) =>
                            setFormData({ ...formData, region: e.target.value })
                          }
                          placeholder="e.g., North America, Europe"
                          bg="gray.700"
                          color="white"
                          border="none"
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel color="white">Company</FormLabel>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          placeholder="Company Name"
                          bg="gray.700"
                          color="white"
                          border="none"
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel color="white">
                          LinkedIn URL{" "}
                          <Text as="span" color="gray.500" fontSize="sm">
                            (Optional)
                          </Text>
                        </FormLabel>
                        <Input
                          type="url"
                          value={formData.linkedIn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              linkedIn: e.target.value,
                            })
                          }
                          placeholder="https://linkedin.com/in/yourprofile"
                          bg="gray.700"
                          color="white"
                          border="none"
                          _placeholder={{ color: "gray.500" }}
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        colorScheme={color}
                        width="100%"
                        size="lg"
                      >
                        Request Access
                      </Button>
                    </VStack>
                  </form>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
