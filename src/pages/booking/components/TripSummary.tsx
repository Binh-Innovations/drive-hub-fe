import { Box, Flex, Text, VStack,  Alert, AlertIcon, Icon } from '@chakra-ui/react';
import { FaCarSide } from "react-icons/fa";
// Divider,

export default function TripSummary() {
    return (
        <Box
            width="100%"
            maxW="800px"
            p={6}
            bg="white"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            mx="auto"
        >
            {/* Header Section */}
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Tóm tắt thông tin chuyến đi
            </Text>

            {/* Trip Details Section */}
            <Box bg="#FFF5EB" p={4} borderRadius="md" mb={6}>
                <Flex justifyContent="space-between" alignItems="center">
                    {/* From Location */}
                    <VStack align="start" spacing={1}>
                        <Text fontSize="xl" fontWeight="bold">Hà Nam</Text>
                        <Text fontSize="lg">14:50</Text>
                        <Text fontSize="sm">T5, 14-11-2024</Text>
                        <Text fontSize="sm">Bến xe thành phố Hà Nam</Text>
                        {/* <Text fontSize="sm">Terminal - 2, Gate - 25</Text> */}
                    </VStack>

                    {/* Icon and Duration */}
                    <VStack spacing={1} textAlign="center">
                        <Text fontSize="sm" color="gray.600">2hr 30min</Text>
                        <Flex alignItems="center">
                            <Box width="50px" height="1px" bgColor="gray.300" />
                            <Icon as={FaCarSide} w={6} h={6} mx={2} color="gray.500" />
                            <Box width="50px" height="1px" bgColor="gray.300" />
                        </Flex>
                    </VStack>

                    {/* To Location */}
                    <VStack align="end" spacing={1}>
                        <Text fontSize="xl" fontWeight="bold">Hà Nội</Text>
                        <Text fontSize="lg">17:20</Text>
                        <Text fontSize="sm">T5, 14-11-2024</Text>
                        <Text fontSize="sm">Bến Xe Mỹ Đình</Text>
                        {/* <Text fontSize="sm">Terminal - 2, Gate - 25</Text> */}
                    </VStack>
                </Flex>

                {/* <Divider my={4} /> */}

            </Box>

            {/* Tổng cộng Section */}
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">Giá vé</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="purple.600">100.000 VND</Text>
                </VStack>
            </Flex>

            {/* Warning Section */}
            <Alert status="info" variant="left-accent" borderRadius="md">
                <AlertIcon />
                Khuyến cáo khách hàng không mang theo vật phẩm có mùi theo hành lý như mắm, sầu riêng,...
            </Alert>
        </Box>
    );
}
