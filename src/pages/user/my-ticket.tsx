import { useState } from 'react';
import {
    Box,
    Center,
    Spinner,
    Text,
    VStack,
    HStack,
    Select
} from '@chakra-ui/react';
import { Pagination } from 'antd';
import TicketList from './components/TicketList';
import {useQuery} from "@tanstack/react-query";
import serviceTicket from "@/apis/service/ticket.ts";

const TicketsPage = () => {
    const [searchParams, setSearchParams] = useState({
        page: 0,
        limit: 10,
    });

    const {
        data: listTicket = {
            contents: [],
            totalElements: 0,
        },
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['my-tickets', searchParams],
        queryFn: async ({ queryKey }: any) => {
            const [, _searchParams] = queryKey;
            return await serviceTicket.getMyTickets({
                page: _searchParams.page,
                limit: _searchParams.limit,
            });
        }
    })

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Center h="100vh">
                <Text color="red.500">
                    Error: {error instanceof Error ? error.message : 'Something went wrong'}
                </Text>
            </Center>
        );
    }

    return (
        <Box maxW="container.xl" mx="auto" py={8} px={4}>
            <VStack spacing={6} align="stretch">
                {/* Filters */}
                <HStack justify="space-between">
                    <Select
                        w="200px"
                        value={searchParams.limit}
                        onChange={(e) => {
                            setSearchParams({
                                ...searchParams,
                                limit: +e.target.value,
                                page: 0,
                            });
                        }}
                    >
                        <option value={5}>5 vé mỗi trang</option>
                        <option value={10}>10 vé mỗi trang</option>
                        <option value={20}>20 vé mỗi trang</option>
                    </Select>
                    {/* You can add more filters here */}
                </HStack>

                {/* Ticket List */}
                <TicketList tickets={listTicket?.contents || []} />

                {/* Pagination */}
                <Box py={4}>
                    <Pagination
                        current={searchParams.page + 1}
                        pageSize={searchParams.limit}
                        total={listTicket.totalElements}
                        onChange={(newPage) => {
                            setSearchParams({
                                ...searchParams,
                                page: newPage - 1,
                            });
                        }}
                        showSizeChanger={false}
                        showTotal={(total) => `Tổng ${total} vé`}
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export default TicketsPage;