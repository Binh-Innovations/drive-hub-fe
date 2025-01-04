import {SearchTrip} from "@/components";
import {
    Box,
    Flex,
    Text,
} from "@chakra-ui/react";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import TripItem from "./components/TripItem";
import {useQuery} from "@tanstack/react-query";
import serviceTrip from "@/apis/service/trip.ts";
import {formatObject} from "@/utils";
import {Pagination} from "antd";

export default function Trip() {
    const [searchParams] = useSearchParams();

    const [params, setParams] = useState({
        page: 0,
        limit: 10,
        startStationId: searchParams?.get("from"),
        endStationId: searchParams?.get("to"),
        date: searchParams?.get("date"),
    })

    const {
        data: listTripData = {
            contents: [],
            totalElements: 0,
            totalPage: 0,
        }
    } = useQuery({
        queryKey: ['listTrip', params],
        queryFn: async ({queryKey}) => {
            const [, _params] = queryKey;
            return await serviceTrip.getAllTrip(formatObject(_params));
        },
    })

    const handleSearch = (data: any) => {
        setParams({
            ...params,
            startStationId: data.startStationId,
            endStationId: data.endStationId,
            date: data.date,
        })
    }

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
                    onSearch={handleSearch}
                    defaultSearchParams={{
                        startStationId: searchParams?.get("from") || "",
                        endStationId: searchParams?.get("to") || "",
                        date: searchParams?.get("date") || "",
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
                    {listTripData?.contents?.length > 0 ? (
                        listTripData?.contents?.map((trip: any) => (
                            <TripItem
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

                    <Pagination
                        current={params.page + 1}
                        total={listTripData.totalElements}
                        pageSize={params.limit}
                        showSizeChanger={false}
                        onChange={(page) => {
                            setParams({
                                ...params,
                                page: page - 1,
                            });
                        }}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
