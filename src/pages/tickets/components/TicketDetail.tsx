import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  VStack,
  Divider,
  Image,
  Icon,
} from '@chakra-ui/react';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

interface TicketProps {
  id: string;
  customerName: string;
  from: string;
  to: string;
  departureTime: string;
  seatNumber: string;
  price: number;
}

const TicketDetail: React.FC<{ ticket: TicketProps }> = ({ ticket }) => {
  return (
    <Box maxW="1200px" mx="auto" mt="10" p="6" boxShadow="2xl" borderRadius="lg" bg="white">
      <Flex direction={['column', 'row']} align="start" justify="space-between">
        {/* Ticket Details */}
        <Box flex="1" p="4">
          <Heading as="h2" size="lg" textAlign="left" mb="6" color="teal.600">
            Chi Tiết Vé
          </Heading>
          <VStack spacing="4" align="start">
            {[
              { label: 'Mã vé', value: ticket.id },
              { label: 'Họ tên', value: ticket.customerName },
              { label: 'Điểm đi', value: ticket.from },
              { label: 'Điểm đến', value: ticket.to },
              { label: 'Thời gian', value: ticket.departureTime },
              { label: 'Số ghế', value: ticket.seatNumber },
              { label: 'Giá vé', value: `${ticket.price.toLocaleString()} VND` },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <Flex justify="space-between" w="100%">
                  <Text fontWeight="bold" color="gray.700">
                    {item.label}:
                  </Text>
                  <Text color="gray.800">{item.value}</Text>
                </Flex>
                <Divider />
              </React.Fragment>
            ))}
          </VStack>
          <Flex mt="8" justify="space-between">
            <Button
              colorScheme="gray"
              size="lg"
              leftIcon={<Icon as={FiArrowLeft} />}
              _hover={{ bg: 'gray.300' }}
            >
              Quay lại
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<Icon as={FiDownload} />}
              _hover={{ bg: 'blue.600' }}
            >
              Tải PDF
            </Button>
          </Flex>
        </Box>

        {/* Image Section */}
        <Box flex="1" p="4" display="flex" justifyContent="center" alignItems="center">
          <Image
            src="https://static.vivnpay.vn/202408011046/xe-khach-8-2024.jpg"
            alt="Xe khách"
            objectFit="cover"
            w="90%"
            h="auto"
            border="2px solid teal"
            borderRadius="lg"
            boxShadow="md"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default TicketDetail;
