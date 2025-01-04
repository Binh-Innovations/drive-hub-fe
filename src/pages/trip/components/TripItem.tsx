import {Box, Flex, Text} from '@chakra-ui/react';
import {PrimaryButton} from '@/components';
import {FaCarSide} from "react-icons/fa";
import moment from "moment";
import {getTimeDiff} from "@/utils";

export default function TripItem({item}: { item: any }) {
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
                flexDirection={{
                    base: 'column',
                    sm: 'row'
                }}>
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
                        >
                            <Text variant={'body-large-bold'}>
                                {moment(item?.departureTime).format('HH:mm') ?? ''}
                            </Text>
                            <Text variant={'body-tiny'}>

                                {item?.route?.startStation?.name ?? ''}
                            </Text>
                        </Flex>
                        <Box>
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
                        </Box>
                        <Flex
                            flexDirection={'column'}
                            alignItems={'flex-end'}
                        >
                            <Text variant={'body-large-bold'}>
                                {moment(item?.arrivalTime).format('HH:mm') ?? ''}
                            </Text>
                            <Text variant={'body-tiny'}>
                                {item?.route?.endStation.name ?? ''}
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
                <Flex
                    flexDirection={{
                        base: 'row',
                        sm: 'column'
                    }}
                    justifyContent={{
                        base: 'space-between',
                        sm: 'space-evenly'
                    }}
                    alignItems={'center'}
                >
                    <Text variant={'body-extra-large-bold'}>
                        100.000đ
                    </Text>
                    <PrimaryButton>
                        Đặt ngay
                    </PrimaryButton>
                </Flex>
            </Flex>
            <Flex mt={5} justifyContent={'space-between'}>
                <Text variant={'body-small'}>
                    10 chỗ trống
                </Text>
                <Text color='orange' variant={'body-small'}>
                    Partially refundable
                </Text>
                <Text
                    variant={'body-small-bold'}
                    color='primary.600'
                    cursor={'pointer'}
                >
                    Xem chi tiết
                </Text>
            </Flex>
        </Box>
    )
}