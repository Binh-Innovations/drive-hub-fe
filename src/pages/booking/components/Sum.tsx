import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const SelectSeatPage: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <Box maxW="1200px" mx="auto"  p="1">
      <Text fontSize="25px" fontWeight="bold" textAlign="center">
        Tổng cộng
      </Text>
      <Text fontSize="25px" fontWeight="semibold" textAlign="center" color="green.500">
        {totalPrice.toLocaleString('vi-VN')} VND
      </Text>
    </Box>
  );
};

export default SelectSeatPage;
