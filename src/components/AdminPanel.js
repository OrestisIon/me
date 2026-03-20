import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
  Card,
  CardBody,
  HStack,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  getAccessRequests,
  approveRequest,
  rejectRequest,
  deleteApprovedCode,
} from "../utils/accessStorage";

export default function AdminPanel({ color, onClose }) {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    setRequests(getAccessRequests());
  };

  const handleApprove = (requestId) => {
    const result = approveRequest(requestId);
    if (result) {
      setSelectedRequest(result);
      setGeneratedCode(result.accessCode);
      onOpen();
      loadRequests();
      toast({
        title: "Request Approved",
        description: `Access code generated for ${result.fullName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReject = (requestId) => {
    const result = rejectRequest(requestId);
    if (result) {
      loadRequests();
      toast({
        title: "Request Rejected",
        description: `Access request from ${result.fullName} has been rejected`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Access code copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (requestId, fullName) => {
    const result = deleteApprovedCode(requestId);
    if (result) {
      loadRequests();
      toast({
        title: "Access Revoked",
        description: `Access code for ${fullName} has been deleted`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const approvedRequests = requests.filter((r) => r.status === "approved");
  const rejectedRequests = requests.filter((r) => r.status === "rejected");

  return (
    <Box bg="gray.900" minH="100vh" py={10}>
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Heading color="white">Admin Panel</Heading>
            <Button onClick={onClose} colorScheme="gray">
              Back to Portfolio
            </Button>
          </HStack>

          <Card bg="gray.800">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack spacing={8}>
                  <VStack>
                    <Text color="gray.400" fontSize="sm">
                      Pending
                    </Text>
                    <Text color={`${color}.400`} fontSize="2xl" fontWeight="bold">
                      {pendingRequests.length}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text color="gray.400" fontSize="sm">
                      Approved
                    </Text>
                    <Text color="green.400" fontSize="2xl" fontWeight="bold">
                      {approvedRequests.length}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text color="gray.400" fontSize="sm">
                      Rejected
                    </Text>
                    <Text color="red.400" fontSize="2xl" fontWeight="bold">
                      {rejectedRequests.length}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {pendingRequests.length > 0 && (
            <Box>
              <Heading size="md" color="white" mb={4}>
                Pending Requests
              </Heading>
              <Box overflowX="auto" bg="gray.800" borderRadius="lg">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th color="gray.400">Name</Th>
                      <Th color="gray.400">Email</Th>
                      <Th color="gray.400">Region</Th>
                      <Th color="gray.400">Company</Th>
                      <Th color="gray.400">Date</Th>
                      <Th color="gray.400">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pendingRequests.map((request) => (
                      <Tr key={request.id}>
                        <Td color="white">{request.fullName}</Td>
                        <Td color="white">{request.email}</Td>
                        <Td color="white">{request.region}</Td>
                        <Td color="white">{request.company}</Td>
                        <Td color="gray.400">
                          {new Date(request.timestamp).toLocaleDateString()}
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              colorScheme="green"
                              onClick={() => handleApprove(request.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          )}

          {approvedRequests.length > 0 && (
            <Box>
              <Heading size="md" color="white" mb={4}>
                Approved Requests
              </Heading>
              <Box overflowX="auto" bg="gray.800" borderRadius="lg">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th color="gray.400">Name</Th>
                      <Th color="gray.400">Email</Th>
                      <Th color="gray.400">Access Code</Th>
                      <Th color="gray.400">Status</Th>
                      <Th color="gray.400">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {approvedRequests.map((request) => (
                      <Tr key={request.id}>
                        <Td color="white">{request.fullName}</Td>
                        <Td color="white">{request.email}</Td>
                        <Td>
                          <HStack>
                            <Input
                              value={request.accessCode}
                              isReadOnly
                              size="sm"
                              bg="gray.700"
                              color="white"
                              width="120px"
                            />
                            <Button
                              size="sm"
                              onClick={() => copyToClipboard(request.accessCode)}
                            >
                              Copy
                            </Button>
                          </HStack>
                        </Td>
                        <Td>
                          <Badge colorScheme="green">Approved</Badge>
                        </Td>
                        <Td>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDelete(request.id, request.fullName)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          )}

          {requests.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text color="gray.400" fontSize="lg">
                No access requests yet.
              </Text>
            </Box>
          )}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader color="white">Access Code Generated</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing={4}>
              <Text color="white">
                Access code for{" "}
                <Text as="span" fontWeight="bold">
                  {selectedRequest?.fullName}
                </Text>
                :
              </Text>
              <Input
                value={generatedCode}
                isReadOnly
                size="lg"
                textAlign="center"
                fontSize="2xl"
                fontWeight="bold"
                bg="gray.700"
                color={`${color}.400`}
              />
              <Text color="gray.400" fontSize="sm">
                Send this code to: {selectedRequest?.email}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={color}
              mr={3}
              onClick={() => copyToClipboard(generatedCode)}
            >
              Copy Code
            </Button>
            <Button variant="ghost" color="white" onClick={onModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
