import {Box, Flex, Text} from '@chakra-ui/react';
import {PrimaryButton} from '@/components';
import {FaCarSide} from "react-icons/fa";
import moment from "moment";
import {getTimeDiff} from "@/utils";
import {useNavigate} from "react-router-dom";
import {VEHICLE_TYPES} from "@/constants/data.ts";

export default function TripItem({ item }: { item: any }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/booking/' + item.id);
    }

    const vehicleText =
        VEHICLE_TYPES.find((type) => type.value === item?.vehicle?.vehicleType)?.label +
        ' ' +
        (item?.vehicle?.seatColumns * item?.vehicle?.seatRows) +
        ' chỗ';
    return (
        <Box
            backgroundColor={'white'}
            padding={{
                base: '15px',
                md: '20px'
            }}
            alignSelf={'center'}
            width={{
                base: '100%',
            }}
        >
            <Flex
                gap={3}
                flexDirection={'column'}>
                <Box
                    width={'100%'}
                    bgColor={'secondary.50'}
                    padding={'10px'}
                >
                    <Flex justifyContent={'space-between'}>
                        <Text variant={'body-tiny'}>
                            {moment(item?.departureTime).format('DD/MM/YYYY') ?? ''}
                        </Text>

                        <Text variant={'body-tiny'}>
                            {moment(item?.arrivalTime).format('DD/MM/YYYY') ?? ''}
                        </Text>
                    </Flex>
                    <Flex justifyContent={'space-between'}>
                        <Flex
                            flexDirection={'column'}
                            alignItems={'flex-start'}
                            width={'35%'}
                        >
                            <Text variant={'body-large-bold'}>
                                {moment(item?.departureTime).format('HH:mm') ?? ''}
                            </Text>
                            <Text variant={'body-tiny'}>
                                {item?.route?.startStation?.name ?? ''}
                            </Text>

                            <Text variant={'body-tiny'}>
                                {item?.route?.startStation?.address ?? ''}
                            </Text>
                        </Flex>
                        <Box
                            width={'30%'}
                            textAlign={'center'}
                        >
                            <Text variant={'body-small-bold'} padding={'0 20px'}>
                                {getTimeDiff(item?.departureTime, item?.arrivalTime)}
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
                        <Flex
                            flexDirection={'column'}
                            alignItems={'flex-end'}
                            width={'35%'}
                        >
                            <Text variant={'body-large-bold'}>
                                {moment(item?.arrivalTime).format('HH:mm') ?? ''}
                            </Text>
                            <Text variant={'body-tiny'}>
                                {item?.route?.endStation.name ?? ''}
                            </Text>
                            <Text variant={'body-tiny'}>
                                {item?.route?.endStation.address ?? ''}
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            <Flex
                mt={5}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Text variant={'body-extra-large-bold'}>
                    {item?.price.toLocaleString('vi-VN')} VND
                </Text>
                <PrimaryButton onClick={handleClick}>
                    Đặt ngay
                </PrimaryButton>
            </Flex>
        </Box>
    )
}