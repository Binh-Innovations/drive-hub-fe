import { Grid, GridItem, Input, Box, Select, Icon, FormControl, FormLabel } from '@chakra-ui/react';
import { IoIosSearch, IoIosSwap } from 'react-icons/io';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { MdLocationPin } from "react-icons/md";
import { IoIosRadioButtonOn } from "react-icons/io";
import { useState, useEffect } from 'react';

export default function SearchTrip() {
    const [dateValue, setDateValue] = useState("");
    const [placeholderDate, setPlaceholderDate] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const currentDate = new Date();

        const min = new Date(currentDate);
        min.setDate(min.getDate() + 1);
        const formattedMinDate = min.toISOString().slice(0, 10);
        setMinDate(formattedMinDate);

        // Tính ngày kết thúc (sau 30 ngày kể từ ngày mai)
        const max = new Date(currentDate);
        max.setDate(max.getDate() + 31);
        const formattedMaxDate = max.toISOString().slice(0, 10);
        setMaxDate(formattedMaxDate);

        // Thiết lập giá trị mặc định cho input ngày đi
        setDateValue(formattedMinDate);

        // Thiết lập placeholder
        const placeholder = min.toLocaleDateString("en-GB");
        setPlaceholderDate(placeholder);
    }, []);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateValue(event.target.value);
    };

    return (
        <Grid templateColumns={'repeat(2, 1fr)'} mt={3} gap={3}>
            <GridItem
                colSpan={{
                    base: 2,
                    md: 1,
                }}
                display={'flex'}
                alignItems={'center'}
                gap={3}
            >
                <FormControl>
                    <FormLabel mb="1" fontSize="sm" color="gray.600">
                        Điểm đi
                    </FormLabel>
                    <Box display="flex" alignItems="center" borderWidth="1px" borderRadius="md" paddingLeft={3} width="100%">
                        <Icon as={IoIosRadioButtonOn} color="gray.500" />
                        <Select
                            // placeholder="Hà Nội"
                            border="none"
                            _focus={{ boxShadow: "none" }}
                            defaultValue=""
                        >
                            <option value="" disabled style={{ color: 'gray' }}>Hà Nội</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                    </Box>
                </FormControl>

                <Box mx={2} display="flex" alignSelf="center" mt="6" justifyContent="center">
                    <IoIosSwap size={24} />
                </Box>

                <FormControl>
                    <FormLabel mb="1" fontSize="sm" color="gray.600">
                        Điểm đến
                    </FormLabel>
                    <Box display="flex" alignItems="center" borderWidth="1px" borderRadius="md" paddingLeft={3} width="100%">
                        <Icon as={MdLocationPin} color="gray.500" />
                        <Select
                            // placeholder="Nam Định"
                            border="none"
                            _focus={{ boxShadow: "none" }}
                            defaultValue=""
                        >
                            <option value="" disabled style={{ color: 'gray' }}>Hà Nam</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                    </Box>
                </FormControl>
            </GridItem>

            <GridItem
                colSpan={{
                    base: 2,
                    md: 1,
                }}
                display={'flex'}
                alignItems={'center'}
                gap={3}
            >
                <FormControl flex="1">
                    <FormLabel mb="1" fontSize="sm" color="gray.600">
                        Ngày đi
                    </FormLabel>
                    <Input
                        type="date"
                        value={dateValue}
                        onChange={handleDateChange}
                        placeholder={placeholderDate}
                        min={minDate} // Thiết lập ngày bắt đầu là ngày mai
                        max={maxDate} // Thiết lập ngày kết thúc sau 30 ngày
                    />
                </FormControl>

                <PrimaryButton leftIcon={<IoIosSearch />} alignSelf="flex-end" mt="6">
                    Tìm kiếm
                </PrimaryButton>
            </GridItem>
        </Grid>
    );
}
