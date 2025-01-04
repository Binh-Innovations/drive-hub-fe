import { Box, Flex, Text } from '@chakra-ui/react';
import { PrimaryButton } from '@/components';
import { FaCarSide } from "react-icons/fa";

export default function TripItem({item  }:{item: any}) {

    console.log("TripItem props:", item);




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
                    <Text variant={'body-tiny'}>
                        20/11/2024
                    </Text>
                    <Flex justifyContent={'space-between'}>
                        <Box>
                            <Text variant={'body-large-bold'}>
                                14.50
                            </Text>
                            <Text variant={'body-tiny'}>

                                {item.startStation.name ?? ''}
                            </Text>
                        </Box>
                        <Box>
                            <Text variant={'body-small-bold'} padding={'0 20px'}>
                                2 giờ 30 phút
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
                        <Box>
                            <Text variant={'body-large-bold'}>
                                17.20
                            </Text>
                            <Text variant={'body-tiny'}>

                            {item.endStation.name ?? ''}
                            </Text>
                        </Box>
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