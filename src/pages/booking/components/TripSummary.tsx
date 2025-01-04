import {Box, Flex, Text, VStack, Alert, AlertIcon} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {FaCarSide} from "react-icons/fa";
import serviceRoute from "@/apis/service/route.ts";
import moment from "moment";
import {getTimeDiff} from "@/utils";
import {VEHICLE_TYPES} from "@/constants/data.ts";

export default function TripSummary({tripDetail}: { tripDetail: any }) {
    const {
        data: routeData = {}
    } = useQuery({
        queryKey: ['route', tripDetail?.routeId],
        queryFn: async ({queryKey}) => {
            const [, _routeId] = queryKey
            if (!_routeId) return
            return await serviceRoute.getRouteById(_routeId)
        },
        enabled: !!tripDetail?.routeId
    })

    const vehicleText =
        VEHICLE_TYPES.find((type) => type.value === tripDetail?.vehicle?.vehicleType)?.label +
        ' ' +
        (tripDetail?.vehicle?.seatColumns * tripDetail?.vehicle?.seatRows) +
        ' chỗ';

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
            <Flex
                bg="#FFF5EB"
                p={3}
                borderRadius="md"
                mb={6}
                alignItems={'center'}
            >
                {/* From Location */}
                <Flex
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    width={'35%'}>
                    <Text fontSize="xl" fontWeight="bold">
                        {routeData?.startStation?.name}
                    </Text>
                    <Text fontSize="lg">
                        {moment(tripDetail?.departureTime).format('HH:mm')}
                    </Text>
                    <Text fontSize="sm">
                        {moment(tripDetail?.departureTime).format('DD-MM-YYYY')}
                    </Text>
                    <Text fontSize="sm">
                        {routeData?.startStation?.address}
                    </Text>
                </Flex>

                {/* Icon and Duration */}
                <Box
                    textAlign={'center'}
                    width={'30%'}>
                    <Text fontSize="sm" color="gray.600">
                        {getTimeDiff(tripDetail?.departureTime, tripDetail?.arrivalTime)}
                    </Text>

                    <Flex justifyContent={'space-between'} gap={1} alignItems={'center'}>
                        <Box
                            width={'40%'}
                            height={'1px'}
                            bgColor={'gray.300'}
                        />
                        <FaCarSide
                            size={20}

                            color='gray'
                        />
                        <Box
                            width={'40%'}
                            height={'1px'}
                            bgColor={'gray.300'}
                        />
                    </Flex>
                    <Text variant={'body-tiny'}>
                        {vehicleText}
                    </Text>
                </Box>

                {/* To Location */}
                <Flex
                    flexDirection={'column'}
                    alignItems={'flex-end'}
                    width={'35%'}>
                    <Text fontSize="xl" fontWeight="bold">
                        {routeData?.endStation?.name}
                    </Text>
                    <Text fontSize="lg">
                        {moment(tripDetail?.arrivalTime).format('HH:mm')}
                    </Text>
                    <Text fontSize="sm">
                        {moment(tripDetail?.arrivalTime).format('DD-MM-YYYY')}
                    </Text>
                    <Text fontSize="sm">
                        {routeData?.endStation?.address}
                    </Text>
                    {/* <Text fontSize="sm">Terminal - 2, Gate - 25</Text> */}
                </Flex>
            </Flex>

            {/* Tổng cộng Section */
            }
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">Giá vé</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                        {tripDetail?.price?.toLocaleString('vi-VN')} VND
                    </Text>
                </VStack>
            </Flex>

            {/* Warning Section */
            }
            <Alert status="info" variant="left-accent" borderRadius="md">
                <AlertIcon/>
                Khuyến cáo khách hàng không mang theo vật phẩm có mùi theo hành lý như mắm, sầu riêng,...
            </Alert>
        </Box>
    )
        ;
}
