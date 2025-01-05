import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import FeatureCard from './FeatureCard';
import {HOME_FEATURES} from "@/constants/data.ts";

const FeaturesSection = () => {
    return (
        <Box py={20} bg="gray.50">
            <Container maxW="container.xl">
                <VStack spacing={12}>
                    {/* Section Header */}
                    <VStack spacing={4} textAlign="center" maxW="container.md" mx="auto"><Heading size="2xl" fontWeight="bold">
                        Tại sao chọn chúng tôi?
                    </Heading>
                        <Text fontSize="lg" color="gray.600">
                            Chúng tôi cam kết mang đến trải nghiệm di chuyển tốt nhất cho hành khách
                        </Text>
                    </VStack>

                    {/* Features Grid */}
                    <Grid
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        }}
                        gap={8}
                        w="full"
                    >
                        {HOME_FEATURES.map((feature, index) => (
                            <FeatureCard
                                key={feature.id}
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                                color={feature.color}
                                delay={index * 0.1}
                            />
                        ))}
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );
};

export default FeaturesSection;