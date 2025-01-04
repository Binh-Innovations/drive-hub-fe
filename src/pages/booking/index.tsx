import { Box, VStack, Text } from '@chakra-ui/react';
import TripSummary from './components/TripSummary';
import Sum from './components/Sum';
import SelectSeat from './components/SelectSeat';
import { PrimaryButton } from '@/components';

const BookingDetails = () => {
    return (
        <Box
            maxW="1000px"
            mx="auto"
            p={{
                base: 0,
                md: 8
            }}
            paddingTop={8}
            paddingBottom={8}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            boxShadow="lg"
        >
            {/* Tiêu đề lớn ở đầu trang */}
            <Text
                fontSize={{
                    base: 'xl',
                    md: '2xl',
                    xl: '3xl'
                }}
                fontWeight="bold"
                mb={8}
                textAlign="center"
                color="gray.700"
            >
                Chi Tiết Thông Tin Đặt Vé
            </Text>

            <VStack spacing={8} align="stretch">
                {/* Trip Summary Section */}
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    p={{
                        base: 2,
                        sm: 6,
                    }}
                    bg="gray.50"
                    boxShadow="sm"
                >
                    <TripSummary />
                </Box>

               


                <Box borderWidth="1px" borderRadius="lg" p={6} bg="gray.50" boxShadow="sm">
                    <SelectSeat />
                </Box>
                 Contact Details Section 
                 <Box borderWidth="1px" borderRadius="lg" p={1} bg="gray.50" boxShadow="sm">
                    <Sum />
                </Box>

                <PrimaryButton
                    w={{
                        base: '300px',
                        md: '400px'
                    }}
                    mx={'auto'}
                >
                    Thanh Toán
                </PrimaryButton>

            </VStack>
        </Box>
    );
};

export default BookingDetails;
