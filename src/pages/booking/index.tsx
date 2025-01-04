/* eslint-disable */

import serviceTicket from '@/apis/service/ticket';
import { IGetAllTicketAvailable } from '@/apis/service/type.response';
import { PrimaryButton } from '@/components';
import { TRIP_ID } from '@/constants/data';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SelectSeat from './components/SelectSeat';
import Sum from './components/Sum';
import TripSummary from './components/TripSummary';
const BookingDetails = () => {
    const tripId = Number(localStorage.getItem(TRIP_ID))
    // console.log('tripId line 10----', tripId )
    
    // const navigate = useNavigate()
    const [listSeats, setListSeats] = useState<IGetAllTicketAvailable[]>([])

    useEffect(()=> {
        if(tripId) {
            const handle =async  ()=> {
                const response = await serviceTicket.getAllAvailableTicket(Number(tripId))
                // console.log('response line 17------', response )
                setListSeats(response.listSeat)
            }
            handle()
        }
    }, [tripId])
    // console.log(listSeats)
    const handleBack = ()=> {
        localStorage.removeItem(TRIP_ID)
        // Navigate
        // navigate('/trip')
        window.history.back()
    }


    
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
            {/* <Text
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
            </Text> */}

<Flex
        align="center"
        justify="center"
        mb={8}
        textAlign="center"
        color="gray.700"
      >
        <Icon
          as={ArrowBackIcon}
          w={6}
          h={6}
          mr={4}
          cursor="pointer"
          onClick={handleBack} // Quay lại trang trước
        />
        <Text
          fontSize={{
            base: 'xl',
            md: '2xl',
            xl: '3xl'
          }}
          fontWeight="bold"
        >
          Chi Tiết Thông Tin Đặt Vé
        </Text>
      </Flex>




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
                    <SelectSeat  listSeats={listSeats}/>
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
