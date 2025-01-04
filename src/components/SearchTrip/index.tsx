import serviceStation from "@/apis/service/station";
import PrimaryButton from "@/components/Button/PrimaryButton";
import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Icon,
    Input,
    Select,
} from "@chakra-ui/react";
import moment from "moment";
import {useState} from "react";
import {IoIosRadioButtonOn, IoIosSearch, IoIosSwap} from "react-icons/io";
import {MdLocationPin} from "react-icons/md";
import {useQuery} from "@tanstack/react-query";

interface SearchTripProps {
    onSearch: (data: any) => void;
    defaultSearchParams?: {
        startStationId: string;
        endStationId: string;
        date: string;
    }
}

export default function SearchTrip(
    {
        onSearch,
        defaultSearchParams,
    }: SearchTripProps) {
    const [searchParams, setSearchParams] = useState({
        startStationId: defaultSearchParams?.startStationId || '',
        endStationId: defaultSearchParams?.endStationId || '',
        date: defaultSearchParams?.date || moment().format('YYYY-MM-DD'),
    })

    const {
        data: listStationData = {
            contents: [],
        }
    } = useQuery({
        queryKey: ['listStation'],
        queryFn: async () => await serviceStation.getAllStation({
            page: 0,
            limit: 100,
        }),
    })

    const handleSearch = () => {
        onSearch(searchParams);
    }

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
                    <Box display="flex" alignItems="center" borderWidth="1px" borderRadius="md" paddingLeft={3}
                         width="100%">
                        <Icon as={IoIosRadioButtonOn} color="gray.500"/>
                        <Select
                            border="none"
                            _focus={{boxShadow: "none"}}
                            value={searchParams.startStationId}
                            onChange={(e) => {
                                setSearchParams({
                                    ...searchParams,
                                    startStationId: e.target.value,
                                });
                            }}
                        >
                            <option value="" disabled style={{color: 'gray'}}>Chọn điểm đi</option>
                            {listStationData?.contents?.map((station: any) => (
                                <option key={station.id} value={station.id.toString()}>
                                    {station.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </FormControl>
                <Box mx={2} display="flex" alignSelf="center" mt="6" justifyContent="center">
                    <IoIosSwap size={24}/>
                </Box>
                <FormControl>
                    <FormLabel mb="1" fontSize="sm" color="gray.600">
                        Điểm đến
                    </FormLabel>
                    <Box display="flex" alignItems="center" borderWidth="1px" borderRadius="md" paddingLeft={3}
                         width="100%">
                        <Icon as={MdLocationPin} color="gray.500"/>
                        <Select
                            border="none"
                            _focus={{boxShadow: "none"}}
                            value={searchParams.endStationId}
                            onChange={(e) => {
                                setSearchParams({
                                    ...searchParams,
                                    endStationId: e.target.value,
                                });
                            }}
                        >
                            <option value="" disabled style={{color: 'gray'}}>Chọn điểm đến</option>
                            {listStationData?.contents?.map((station: any) => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            ))}
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
                        value={searchParams.date}
                        onChange={(e) => {
                            setSearchParams({
                                ...searchParams,
                                date: e.target.value,
                            });
                        }}
                    />
                </FormControl>
                <PrimaryButton leftIcon={<IoIosSearch/>} alignSelf="flex-end" mt="6" onClick={handleSearch}>
                    Tìm kiếm
                </PrimaryButton>
            </GridItem>
        </Grid>
    )
};
