import categoriesDb from '../mocks/db/categories.db';
import productsDb from '../mocks/db/products.db';
import usersDb from '../mocks/db/users.db';
import rolesDb from '../mocks/db/roles.db';
import projectsDb from '../mocks/db/projects.db';

export const examplePages = {
	examplesPage: {
		id: 'examplesPage',
		to: '/examples-page',
		text: 'Examples Page',
		icon: 'HeroBookOpen',
	},
	duotoneIconsPage: {
		id: 'duotoneIconsPage',
		to: '/duotone-icons',
		text: 'Duotone Icons',
		icon: 'HeroCubeTransparent',
	},
};

export const appPages = {
	aiAppPages: {
		id: 'aiApp',
		to: '/admin/ai',
		text: 'AI',
		icon: 'HeroRocketLaunch',
		subPages: {
			aiDashboardPage: {
				id: 'aiDashboardPage',
				to: '/admin/ai/dashboard',
				text: 'AI Dashboard',
				icon: 'HeroRocketLaunch',
			},
			chatPages: {
				id: 'customerPage',
				to: '/admin/ai/chat',
				text: 'Chat Pages',
				icon: 'HeroChatBubbleLeft',
				subPages: {
					photoPage: {
						id: 'photoPage',
						to: '/admin/ai/chat/photo',
						text: 'Photo Editing',
						icon: 'HeroPhoto',
					},
					videoPage: {
						id: 'videoPage',
						to: '/admin/ai/chat/video',
						text: 'Video Generation',
						icon: 'HeroFilm',
					},
					audioPage: {
						id: 'audioPage',
						to: '/admin/ai/chat/audio',
						text: 'Audio Generation',
						icon: 'HeroMusicalNote',
					},
					codePage: {
						id: 'audioPage',
						to: '/admin/ai/chat/code',
						text: 'Code Generation',
						icon: 'HeroCommandLine',
					},
				},
			},
		},
	},
	salesAppPages: {
		id: 'salesApp',
		to: '/admin/sales',
		text: 'Sales',
		icon: 'HeroBanknotes',
		subPages: {
			salesDashboardPage: {
				id: 'salesDashboardPage',
				to: '/admin/sales',
				text: 'Sales Dashboard',
				icon: 'HeroRectangleGroup',
			},
			productPage: {
				id: 'productPage',
				to: '/admin/sales/product',
				text: 'Products',
				icon: 'HeroRectangleStack',
				subPages: {
					listPage: {
						id: 'productsListPage',
						to: '/admin/sales/product/list',
						text: 'Products List',
						icon: 'HeroQueueList',
					},
					editPage: {
						id: 'productPage',
						to: `/admin/sales/product/${productsDb[0].id}`,
						text: `Product #${productsDb[0].id}`,
						icon: 'HeroTicket',
					},
					editPageLink: {
						id: 'editPageLink',
						to: '/admin/sales/product',
					},
				},
			},
			categoryPage: {
				id: 'categoryPage',
				to: '/admin/sales/category',
				text: 'Category',
				icon: 'HeroSquare2Stack',
				subPages: {
					listPage: {
						id: 'categoryListPage',
						to: '/admin/sales/category/list',
						text: 'Category List',
						icon: 'HeroQueueList',
					},
					editPage: {
						id: 'productPage',
						to: `/admin/sales/category/${categoriesDb[0].id}`,
						text: `Category #${categoriesDb[0].id}`,
						icon: 'HeroStop',
					},
					editPageLink: {
						id: 'editPageLink',
						to: '/admin/sales/category',
					},
				},
			},
		},
	},
	crmAppPages: {
		id: 'crmApp',
		to: '/admin/crm',
		text: 'CRM',
		icon: 'HeroUserGroup',
		subPages: {
			crmDashboardPage: {
				id: 'crmDashboardPage',
				to: '/admin/crm/dashboard',
				text: 'CRM Dashboard',
				icon: 'HeroUserCircle',
			},
			customerPage: {
				id: 'customerPage',
				to: '/admin/crm/customer',
				text: 'Customers',
				icon: 'HeroUserGroup',
				subPages: {
					listPage: {
						id: 'crmListPage',
						to: '/admin/crm/customer/list',
						text: 'Customers List',
						icon: 'HeroQueueList',
					},
					editPage: {
						id: 'customerPage',
						to: `/admin/crm/customer/${usersDb[0].id}`,
						text: `Customer @${usersDb[0].id}`,
						icon: 'HeroUser',
					},
					editPageLink: {
						id: 'editPageLink',
						to: '/admin/crm/customer',
					},
				},
			},
			rolePage: {
				id: 'rolePage',
				to: '/admin/crm/role',
				text: 'Roles',
				icon: 'HeroShieldCheck',
				subPages: {
					listPage: {
						id: 'crmListPage',
						to: '/admin/crm/role/list',
						text: 'Role List',
						icon: 'HeroQueueList',
					},
					editPage: {
						id: 'customerPage',
						to: `/admin/crm/role/${rolesDb[0].id}`,
						text: `Role @${rolesDb[0].id}`,
						icon: 'HeroShieldExclamation',
					},
					editPageLink: {
						id: 'editPageLink',
						to: '/admin/crm/role',
					},
				},
			},
		},
	},
	projectAppPages: {
		id: 'projectApp',
		to: '/admin/project',
		text: 'Project',
		icon: 'HeroClipboardDocumentCheck',
		subPages: {
			projectDashboardPage: {
				id: 'projectDashboardPage',
				to: '/admin/project/dashboard',
				text: 'Projects Dashboard',
				icon: 'HeroClipboardDocumentCheck',
			},
			projectBoardPage: {
				id: 'projectBoardPage',
				to: `/admin/project/board/${projectsDb[0].id}`,
				text: `Board ${projectsDb[0].name}`,
				icon: 'HeroQrCode',
			},
			projectBoardPageLink: {
				id: 'projectBoardPageLink',
				to: '/admin/project/board',
			},
		},
	},
	educationAppPages: {
		id: 'educationApp',
		to: '/admin/education',
		text: 'Education',
		icon: 'HeroBookOpen',
		subPages: {},
	},
	reservationAppPages: {
		id: 'reservationApp',
		to: '/admin/reservation',
		text: 'Reservation',
		icon: 'HeroCalendarDays',
		subPages: {},
	},
	mailAppPages: {
		id: 'mailApp',
		to: '/admin/mail',
		text: 'Mail',
		icon: 'HeroEnvelope',
		subPages: {
			inboxPages: {
				id: 'inboxPages',
				to: '/admin/mail/inbox',
				text: 'Inbox',
				icon: 'HeroEnvelope',
			},
			draftPages: {
				id: 'draftPages',
				to: '/admin/mail/draft',
				text: 'Draft',
				icon: 'HeroDocument',
			},
			sendPages: {
				id: 'sendPages',
				to: '/admin/mail/send',
				text: 'Send',
				icon: 'HeroPaperAirplane',
			},
			junkPages: {
				id: 'junkPages',
				to: '/admin/mail/junk',
				text: 'Junk',
				icon: 'HeroArchiveBoxXMark',
			},
			trashPages: {
				id: 'trashPages',
				to: '/admin/mail/trash',
				text: 'Trash',
				icon: 'HeroTrash',
			},
			archivePages: {
				id: 'archivePages',
				to: '/admin/mail/archive',
				text: 'Archive',
				icon: 'HeroArchiveBox',
			},
			newMailPages: {
				id: 'newMailPages',
				to: '/admin/mail/new',
				text: 'Inbox',
				icon: 'HeroEnvelope',
			},
		},
	},
	chatAppPages: {
		id: 'chatApp',
		to: '/admin/chat',
		text: 'Chat',
		icon: 'HeroChatBubbleLeftRight',
	},
};

export const componentsPages = {
	uiPages: {
		id: 'uiPages',
		to: '/admin/ui',
		text: 'UI',
		icon: 'HeroPuzzlePiece',
		subPages: {
			alertPage: {
				id: 'alertPage',
				to: '/admin/ui/alert',
				text: 'Alert',
				icon: 'HeroBell',
			},
			badgePage: {
				id: 'badgePage',
				to: '/admin/ui/badge',
				text: 'Badge',
				icon: 'HeroSparkles',
			},
			buttonPage: {
				id: 'buttonPage',
				to: '/admin/ui/button',
				text: 'Button',
				icon: 'HeroRectangleStack',
			},
			buttonGroupPage: {
				id: 'buttonGroupPage',
				to: '/admin/ui/button-group',
				text: 'Button Group',
				icon: 'HeroRectangleStack',
			},
			cardPage: {
				id: 'cardPage',
				to: '/admin/ui/card',
				text: 'Card',
				icon: 'HeroSquare2Stack',
			},
			collapsePage: {
				id: 'collapsePage',
				to: '/admin/ui/collapse',
				text: 'Collapse',
				icon: 'HeroBarsArrowDown',
			},
			dropdownPage: {
				id: 'dropdownPage',
				to: '/admin/ui/dropdown',
				text: 'Dropdown',
				icon: 'HeroQueueList',
			},
			modalPage: {
				id: 'modalPage',
				to: '/admin/ui/modal',
				text: 'Modal',
				icon: 'HeroChatBubbleBottomCenter',
			},
			offcanvasPage: {
				id: 'offcanvasPage',
				to: '/admin/ui/offcanvas',
				text: 'Offcanvas',
				icon: 'HeroBars3BottomRight',
			},
			progressPage: {
				id: 'progressPage',
				to: '/admin/ui/progress',
				text: 'Progress',
				icon: 'HeroChartBar',
			},
			tablePage: {
				id: 'tablePage',
				to: '/admin/ui/table',
				text: 'Table',
				icon: 'HeroTableCells',
			},
			tooltipPage: {
				id: 'tooltipPage',
				to: '/admin/ui/tooltip',
				text: 'Tooltip',
				icon: 'HeroChatBubbleLeftEllipsis',
			},
		},
	},
	integratedPages: {
		id: 'integratedPages',
		to: '/admin/integrated',
		text: 'Integrated',
		icon: 'HeroBuildingLibrary',
		subPages: {
			reactDateRangePage: {
				id: 'reactDateRangePage',
				to: '/admin/integrated/react-date-range',
				text: 'React Date Range',
				icon: 'HeroCalendarDays',
			},
			fullCalendarPage: {
				id: 'fullCalendarPage',
				to: '/admin/integrated/full-calendar',
				text: 'Full Calendar',
				icon: 'HeroCalendar',
			},
			apexChartsPage: {
				id: 'apexChartsPage',
				to: '/admin/integrated/apex-charts',
				text: 'ApexCharts',
				icon: 'HeroChartBar',
			},
			reactSimpleMapsPage: {
				id: 'reactSimpleMapsPage',
				to: '/admin/integrated/react-simple-maps',
				text: 'React Simple Maps',
				icon: 'HeroMap',
			},
			waveSurferPage: {
				id: 'waveSurferPage',
				to: '/admin/integrated/wave-surfer',
				text: 'WaveSurfer',
				icon: 'HeroMusicalNote',
			},
			richTextPage: {
				id: 'richTextPage',
				to: '/admin/integrated/slate-react',
				text: 'Rich Text',
				icon: 'HeroBars3BottomLeft',
			},
			reactSelectPage: {
				id: 'reactSelectPage',
				to: '/admin/integrated/react-select',
				text: 'React Select',
				icon: 'HeroQueueList',
			},
		},
	},
	iconsPage: {
		id: 'iconsPage',
		to: '/admin/icons',
		text: 'Icons',
		icon: 'HeroBuildingLibrary',
		subPages: {
			heroiconsPage: {
				id: 'heroiconsPage',
				to: '/admin/icons/heroicons',
				text: 'Heroicons',
				icon: 'HeroShieldCheck',
			},
			duotoneIconsPage: {
				id: 'duotoneIconsPage',
				to: '/admin/icons/duotone-icons',
				text: 'Duotone Icons',
				icon: 'DuoPicker',
			},
		},
	},
};

export const authPages = {
	loginPage: {
		id: 'loginPage',
		to: '/login',
		text: 'Login',
		icon: 'HeroArrowRightOnRectangle',
	},
	profilePage: {
		id: 'profilePage',
		to: '/admin/profile',
		text: 'Profile',
		icon: 'HeroUser',
	},
};

const pagesConfig = {
	...examplePages,
	...authPages,
};

export default pagesConfig;
