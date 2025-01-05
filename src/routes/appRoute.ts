import { HomePage, TripPage, BookingDetailsPage, Payment, LoginPage, RegisterPage, TicketDetailPage, TicketHistoryPage, PaymentSuccessPage} from '@/pages';



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
		path: '/booking/:id',
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
	paymentSuccess: {
		path: '/payment/success',
		component: PaymentSuccessPage,
	}
	
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
