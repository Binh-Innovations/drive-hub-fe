// import { Grid, GridItem, Input, Box, Select, Icon, FormControl, FormLabel } from '@chakra-ui/react';
// import { IoIosSearch, IoIosSwap } from 'react-icons/io';
import serviceStation from "@/apis/service/station";
import serviceTrip from "@/apis/service/trip";
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
import { useEffect, useState } from "react";
import { IoIosRadioButtonOn, IoIosSearch, IoIosSwap } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface SearchTripProps {
  onSearch: (data: any) => void;
  defaultValues?: {
    from: string | null;
    to: string | null;
    date: string | null;
  };
}
export default function SearchTrip({
  onSearch,
  defaultValues,
}: SearchTripProps) {
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(
    defaultValues?.date || moment().format("DD/MM/YYYY")
  );
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [stations, setStations] = useState<any[]>([]);
  const [startStationId, setStartStationId] = useState(
    defaultValues?.from || ""
  );
  const [endStationId, setEndStationId] = useState(defaultValues?.to || "");

  useEffect(() => {
    const fetchStations = async () => {
      const response = await serviceStation.getAllStation();
      setStations(response.contents);
    };
    fetchStations();
  }, []);

  useEffect(() => {
    const today = moment().format("DD/MM/YYYY");
    if (!defaultValues?.date) {
      setDateValue(today);
    }
    setStartTime(moment().startOf("day").valueOf());
    setEndTime(moment().endOf("day").valueOf());
  }, [defaultValues?.date]);

  useEffect(() => {
    if (defaultValues?.from) {
      setStartStationId(defaultValues.from);
    }
    if (defaultValues?.to) {
      setEndStationId(defaultValues.to);
    }
    if (defaultValues?.date) {
      setDateValue(defaultValues.date);
    }
  }, [defaultValues]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = moment(event.target.value);
    const formattedDate = selectedDate.format("DD/MM/YYYY");
    setDateValue(formattedDate);
    setStartTime(selectedDate.startOf("day").valueOf());
    setEndTime(selectedDate.endOf("day").valueOf());
  };

  const handleSearch = () => {
    if (!startStationId || !endStationId) {
      alert("Vui lòng chọn điểm đi và điểm đến");
      return;
    }

    const fetchTrips = async () => {
      try {
        const response = await serviceTrip.getAllTrip(
          0,
          100,
          parseInt(startStationId),
          parseInt(endStationId),
          startTime.toString(),
          endTime.toString()
        );
        onSearch(response);
        navigate(
          `/trip?from=${startStationId}&to=${endStationId}&date=${dateValue}`
        );
      } catch (error) {
        console.error("Error fetching trips:", error);
        alert("Có lỗi xảy ra khi tìm kiếm chuyến xe. Vui lòng thử lại sau.");
      }
    };
    fetchTrips();
  };
  const handleStartStationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartStationId(event.target.value);
  };
  const handleEndStationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEndStationId(event.target.value);
  };

  return (
    <>
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
                                border="none"
                                _focus={{ boxShadow: "none" }}
                                value={startStationId}
                                onChange={handleStartStationChange}
                            >
                                <option value="" disabled style={{ color: 'gray' }}>Chọn điểm đi</option>
                                {stations.map((station) => (
                                    <option key={station.id} value={station.id}>
                                        {station.name}
                                    </option>
                                ))}
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
                                border="none"
                                _focus={{ boxShadow: "none" }}
                                value={endStationId}
                                onChange={handleEndStationChange}
                            >
                                <option value="" disabled style={{ color: 'gray' }}>Chọn điểm đến</option>
                                {stations.map((station) => (
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
                            value={moment(dateValue, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                            onChange={handleDateChange}
                        />
                    </FormControl>
                    <PrimaryButton leftIcon={<IoIosSearch />} alignSelf="flex-end" mt="6" onClick={handleSearch}>
                        Tìm kiếm
                    </PrimaryButton>
                </GridItem>
            </Grid>
           
        </>
  );
}
