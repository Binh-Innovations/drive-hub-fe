import { HomePage, TripPage, BookingDetailsPage, Payment, LoginPage, RegisterPage, TicketDetailPage, TicketHistoryPage} from '@/pages';



const appRoute = {
	home: {
		path: '/',
		component: HomePage,
	},
	trip: {
		path: '/trip',
		component: TripPage,
	},
	booking: {
		path: '/booking',
		component: BookingDetailsPage,
	},
	payment: {
		path: '/payment',
		component: Payment,
	},
	ticketDetail: {
		path: '/ticket/detail',
		component: TicketDetailPage,
	},
	ticketHistory: {
		path: '/ticket/history',
		component: TicketHistoryPage,
	},
	
};

const authRoute = {
	login: {
		path: '/login',
		component: LoginPage,
	},
	register: {
		path: '/register',
		component: RegisterPage,
	},
};

export {
	appRoute,
	authRoute,
};
