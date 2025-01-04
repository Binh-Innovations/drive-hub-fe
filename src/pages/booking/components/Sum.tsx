import { Box, Text } from '@chakra-ui/react';

const SelectSeatPage = ({totalAmount}: {totalAmount: number}) => {
  return (
    <Box maxW="1200px" mx="auto"  p="1">
      <Text fontSize="25px" fontWeight="bold" textAlign="center">
        Tổng cộng
      </Text>
      <Text fontSize="25px" fontWeight="semibold" textAlign="center" color="green.500">
        {totalAmount.toLocaleString('vi-VN')} VND
      </Text>
    </Box>
  );
};

export default SelectSeatPage;
