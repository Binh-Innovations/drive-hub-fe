import serviceTicket from '@/apis/service/ticket';
import {PrimaryButton} from '@/components';
import {Box, Flex, Icon, Text, VStack} from '@chakra-ui/react';
import SelectSeat from './components/SelectSeat';
import Sum from './components/Sum';
import TripSummary from './components/TripSummary';
import {useNavigate, useParams} from "react-router-dom";
import {IoIosArrowBack} from 'react-icons/io';
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import toast from "react-hot-toast";
import useUserInfo from "@/hooks/useUserInfo.ts";

const BookingDetails = () => {
    const {id: tripId} = useParams<string>()
    const {userInfo} = useUserInfo()
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const {
        data: tripData = {
            listSeat: [],
            trip: {}
        }
    } = useQuery({
        queryKey: ['trip', tripId],
        queryFn: async ({queryKey}) => {
            const [, _tripId] = queryKey
            if(!_tripId) return
            return await serviceTicket.getAllAvailableTicket(+_tripId)
        },
        enabled: !!tripId
    })

    const {listSeat: listSeats = [], trip: tripDetail} = tripData

    const handleBack = () => {
        navigate(-1)
    }

    const handleSubmit = async () => {
        if(!userInfo) {
            toast.error('Vui lòng đăng nhập để tiếp tục')
            return
        }

        if(selectedSeats.length === 0) {
            toast.error('Vui lòng chọn ghế trước khi thanh toán')
            return
        }

        try {
            setIsLoading(true)
            const request = {
                tripId: tripDetail.id,
                seatCodes: selectedSeats,
            }
            const response = await serviceTicket.bookTicket(request)

            if(response && response.payment && response.payment.paymentUrl) {
                window.location.href = response.payment.paymentUrl
            }
        } catch (error: any) {
            const msg = error?.message || 'Thanh toán thất bại'
            toast.error(msg)
        } finally {
            setIsLoading(false)
        }
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
            <Flex
                align="center"
                justify="space-between"
                mb={8}
                textAlign="center"
                color="gray.700"
            >
                <Icon
                    as={IoIosArrowBack}
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
                <div />
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
                    <TripSummary tripDetail={tripDetail}/>
                </Box>


                <Box borderWidth="1px" borderRadius="lg" p={6} bg="gray.50" boxShadow="sm">
                    <SelectSeat
                        row={tripDetail?.vehicle?.seatRows}
                        column={tripDetail?.vehicle?.seatColumns}
                        listSeats={listSeats}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                    />
                </Box>
                Contact Details Section
                <Box borderWidth="1px" borderRadius="lg" p={1} bg="gray.50" boxShadow="sm">
                    <Sum
                        totalAmount={selectedSeats.length * tripDetail?.price}
                    />
                </Box>

                <PrimaryButton
                    w={{
                        base: '300px',
                        md: '400px'
                    }}
                    mx={'auto'}
                    isLoading={isLoading}
                    onClick={handleSubmit}
                >
                    Thanh Toán
                </PrimaryButton>
            </VStack>
        </Box>
    );
};

export default BookingDetails;
