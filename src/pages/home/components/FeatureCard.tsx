import {VStack, Heading, Text, Icon, useColorModeValue} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {chakra, shouldForwardProp} from '@chakra-ui/react';
import {isValidMotionProp} from 'framer-motion';

// Định nghĩa MotionBox đúng cách
const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface FeatureCardProps {
    title: string;
    description: string;
    icon: any;
    color: string;
    delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = (
    {
        title,
        description,
        icon,
        color,
        delay
    }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const shadowColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <MotionBox
            display="flex"
            flexDirection="column"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            // @ts-ignore
            transition={{duration: 0.5, delay}}
            whileHover={{y: -5}}
            padding={6}
            bg={bgColor}
            borderRadius="xl"
            boxShadow={`0 4px 6px ${shadowColor}`}
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: color,
            }}
        >
            <VStack spacing={4} align="flex-start">
                <Icon
                    as={icon}
                    boxSize={10}
                    color={color}
                />
                <Heading size="md" fontWeight="bold">
                    {title}
                </Heading>
                <Text color="gray.600" fontSize="sm" lineHeight="tall">
                    {description}
                </Text>
            </VStack>
        </MotionBox>
    );
};

export default FeatureCard;