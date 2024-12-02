/* eslint-disable */
import { PrimaryButton, SearchTrip } from "@/components";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
} from '@ajna/pagination';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TfiFilter } from "react-icons/tfi";
import { useNavigate, useSearchParams } from 'react-router-dom';
import TripItem from "./components/TripItem";
const MOCK_TRIPS = [
  {
    id: 1,
    from: "Hà Nội",
    to: "Hồ Chí Minh",
    departureTime: "07:00",
    arrivalTime: "09:30",
    price: 1200000,
    airline: "Vietnam Airlines",
    seats: 45,
    duration: "2h30m",
    stops: 0
  },
  {
    id: 2,
    from: "Hà Nội",
    to: "Hồ Chí Minh",
    departureTime: "10:15",
    arrivalTime: "12:45",
    price: 900000,
    airline: "Vietjet Air",
    seats: 30,
    duration: "2h30m",
    stops: 1
  },
  {
    id: 3,
    from: "Hà Nội",
    to: "Hồ Chí Minh",
    departureTime: "14:30",
    arrivalTime: "17:00",
    price: 850000,
    airline: "Bamboo Airways",
    seats: 25,
    duration: "2h30m",
    stops: 0
  }
];

export default function Trip() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const [isFilterOpen, setFilterOpen] = useState(false);

  const openFilterModal = () => setFilterOpen(true);
  const closeFilterModal = () => setFilterOpen(false);
  
  const [trips, setTrips] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
 
  if (from && to && date) {
    handleSearchWithParams({
      from,
      to,
      date
    });
  }
}, [from, to, date]);

const handleSearchWithParams = async (searchParams: any) => {

}
const handleSearchResults = (data: any) => {
  // Xử lý dữ liệu nhận được từ component con
  setTrips(data.contents);
  setTotalItems(data.totalElements);
  setTotalPages(data.totalPage);
  setCurrentPage(data.currentPage);
  setPerPage(data.perPage);
}
const handlePageChange = (page: number) => {
  
  if (from && to && date) {
    handleSearchWithParams({
      from,
      to,
      date,
      page: page - 1 // API thường đếm từ 0
    });
  }
};

  return (
    <Flex flexDirection="column" paddingBottom="50px">
      <Box
        padding={{
          base: "20px 20px",
          md: "30px 50px",
        }}
        width="100%"
        backgroundColor="white"
      >
        <SearchTrip 
          onSearch={handleSearchResults}
          defaultValues={{
            from,
            to,
            date
          }}
        />
      </Box>

      <Flex
        flexDirection="column"
        backgroundColor="#F3F3F3"
        padding={{
          base: "20px 20px",
          md: "30px 50px",
        }}
      >
        <Flex
          alignSelf="center"
          flexDirection="column"
          width={{
            base: "100%",
            md: "80%",
            lg: "70%",
            xl: "60%",
            "2xl": "50%",
          }}
          gap={10}
        >
          <Box
            alignSelf="center"
            width={{
              base: "100%",
            }}
          >
            <PrimaryButton
              leftIcon={<TfiFilter />}
              alignSelf="flex-end"
              onClick={openFilterModal}
              width="300px"
              size="lg"
            >
              Lọc
            </PrimaryButton>
          </Box>

            {trips?.length > 0 ? (
            trips.map((trip) => (
              <TripItem
                
                // route={route}
                key={trip.id}
                item={trip}
              />

          ))
        ) : (
          <Flex
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
            backgroundColor="white"
            borderRadius="lg"
            padding="20px"
            flexDirection="column"
            gap={4}
          >
            <Text fontSize="xl" color="gray.500">
              Hiện tại chưa có dữ liệu chuyến đi nào
            </Text>
            <Text color="gray.400">
              Vui lòng thử tìm kiếm với các tiêu chí khác
            </Text>
          </Flex>
        )}
        {trips?.length > 0 && (
          <Pagination
            pagesCount={totalPages}
            currentPage={currentPage + 1}
            onPageChange={handlePageChange}
          >
            <Flex gap={2}>
              <PaginationPrevious
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
              >
                Previous
              </PaginationPrevious>
              <PaginationPageGroup>

                {function(props: { pages: number[]; currentPage: number }) {
                  return props.pages.map((page) => (
                    <PaginationPage
                      key={`pagination_page_${page}`}
                      page={page}
                      bg="white"
                      _hover={{ bg: 'blue.100' }}
                      _current={{
                        bg: 'blue.500',
                        color: 'white'
                      }}
                    />
                  ));
                }}
              </PaginationPageGroup>
              <PaginationNext
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
              >
                Next
              </PaginationNext>
            </Flex>
          </Pagination>
        )}
        </Flex>
      </Flex>

      {/* Pop-up Filter */}
      <Modal isOpen={isFilterOpen} onClose={closeFilterModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Departure Time</Text>
            <RangeSlider defaultValue={[5, 20]} min={0} max={24}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>

            <Text mt={4} mb={2}>
              Price Range
            </Text>
            <RangeSlider defaultValue={[100, 1000]} min={0} max={2000}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>

            <Text mt={4} mb={2}>
              Stop Options
            </Text>
            <Checkbox>Nonstop</Checkbox>
            <Checkbox>1 Stop</Checkbox>
            <Checkbox>2+ Stops</Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={closeFilterModal}>
              Close
            </Button>
            <Button colorScheme="blue" ml={3} onClick={closeFilterModal}>
              Apply Filters
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
