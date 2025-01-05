import {
    Grid,
    Text,
} from '@chakra-ui/react';
import TicketCard from './TicketCard';
import {Ticket} from "@/constants/types.ts";

interface TicketListProps {
    tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
    if (!tickets.length) {
        return (
            <Text textAlign="center" color="gray.500" py={8}>
                Không có vé nào
            </Text>
        );
    }

    return (
        <Grid
            templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)'
            }}
            gap={6}
        >
            {tickets.map((ticket) => (<TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </Grid>
    );
};

export default TicketList;