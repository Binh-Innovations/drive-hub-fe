import {SearchTrip} from "@/components";
import {Box, Flex, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import FeaturesSection from "@/pages/home/components/FeatureSection.tsx";

const Index = () => {
    const navigate = useNavigate();
    const onSearch = (data: any) => {
        navigate({
			pathname: '/trip',
			search: `?from=${data.startStationId}&to=${data.endStationId}&date=${data.date}`,
		});
    }

    return (
        <Flex
            flexDirection={'column'}
            position={'relative'}
            paddingBottom={'4rem'}
        >
            <Box
                backgroundImage={'https://static.vexere.com/production/banners/1209/leaderboard.png'}
                backgroundSize={'cover'}
                backgroundPosition={'center'}
                backgroundRepeat={'no-repeat'}
                width={'100%'}
                height={'500px'}
                alignItems={'center'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'} // Căn giữa nội dung dọc theo Box
            >

                <Box height="20px"/> {/* Tạo khoảng trống để giữ vị trí ổn định */}

                <Box
                    alignSelf="center"
                    padding={{
                        base: '16px 12px',
                        md: '20px 24px',
                    }}
                    backgroundColor="white"
                    marginTop="20px"
                    zIndex={2}
                    width={{
                        base: '100%',
                        lg: '70%',
                        'xl': '60%',
                        '2xl': '50%',
                    }}
                    boxShadow="lg"
                >
                    <Text variant="h3" color="black">
                        Tìm kiếm chuyến đi
                    </Text>

                    <SearchTrip onSearch={onSearch}/>
                </Box>
            </Box>

            <FeaturesSection />
        </Flex>
    )
}

export default Index;
