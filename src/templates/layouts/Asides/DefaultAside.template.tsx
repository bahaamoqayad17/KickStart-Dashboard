import React from 'react';
import { appPages, componentsPages } from '@/config/pages.config';
import { useRouter } from 'next/navigation';
import Aside, { AsideBody, AsideFooter, AsideHead } from '../../../components/layouts/Aside/Aside';
import LogoAndAsideTogglePart from './_parts/LogoAndAsideToggle.part';
import DarkModeSwitcherPart from './_parts/DarkModeSwitcher.part';
import Nav, {
	NavButton,
	NavCollapse,
	NavItem,
	NavSeparator,
	NavTitle,
	NavUser,
} from '../../../components/layouts/Navigation/Nav';
import Badge from '../../../components/ui/Badge';
import UserTemplate from '../User/User.template';
import usersDb from '../../../mocks/db/users.db';

const DefaultAsideTemplate = () => {
	const router = useRouter();

	return (
		<Aside>
			<AsideHead>
				<LogoAndAsideTogglePart />
			</AsideHead>
			<AsideBody>
				<Nav>
					<NavItem {...appPages.salesAppPages.subPages.salesDashboardPage} />
					<NavItem {...appPages.aiAppPages.subPages.aiDashboardPage}>
						<Badge
							variant='outline'
							color='amber'
							className='border-transparent leading-none'>
							NEW
						</Badge>
					</NavItem>
					<NavItem {...appPages.crmAppPages.subPages.crmDashboardPage}>
						<NavButton
							title='New Customer'
							icon='HeroPlusCircle'
							onClick={() => {
								router.push(
									`../${appPages.crmAppPages.subPages.customerPage.to}/new`,
								);
							}}
						/>
					</NavItem>
					<NavItem {...appPages.projectAppPages.subPages.projectDashboardPage}>
						<Badge
							variant='outline'
							color='emerald'
							className='border-transparent leading-none'>
							6
						</Badge>
					</NavItem>

					<NavTitle>Apps</NavTitle>
					<NavCollapse
						text={appPages.salesAppPages.text}
						to={appPages.salesAppPages.to}
						icon={appPages.salesAppPages.icon}>
						<NavItem {...appPages.salesAppPages.subPages.salesDashboardPage} />
						<NavCollapse
							text={appPages.salesAppPages.subPages.productPage.text}
							to={appPages.salesAppPages.subPages.productPage.to}
							icon={appPages.salesAppPages.subPages.productPage.icon}>
							<NavItem
								{...appPages.salesAppPages.subPages.productPage.subPages.listPage}
							/>
							<NavItem
								{...appPages.salesAppPages.subPages.productPage.subPages.editPage}
							/>
						</NavCollapse>
						<NavCollapse
							text={appPages.salesAppPages.subPages.categoryPage.text}
							to={appPages.salesAppPages.subPages.categoryPage.to}
							icon={appPages.salesAppPages.subPages.categoryPage.icon}>
							<NavItem
								{...appPages.salesAppPages.subPages.categoryPage.subPages.listPage}
							/>
							<NavItem
								{...appPages.salesAppPages.subPages.categoryPage.subPages.editPage}
							/>
						</NavCollapse>
					</NavCollapse>

					<NavCollapse
						text={appPages.aiAppPages.text}
						to={appPages.aiAppPages.to}
						icon={appPages.aiAppPages.icon}>
						<NavItem {...appPages.aiAppPages.subPages.aiDashboardPage} />
						<NavCollapse
							text={appPages.aiAppPages.subPages.chatPages.text}
							to={appPages.aiAppPages.subPages.chatPages.to}
							icon={appPages.aiAppPages.subPages.chatPages.icon}>
							<NavItem {...appPages.aiAppPages.subPages.chatPages.subPages.photoPage}>
								<Badge
									variant='outline'
									color='amber'
									className='border-transparent leading-none'>
									22
								</Badge>
							</NavItem>
							<NavItem {...appPages.aiAppPages.subPages.chatPages.subPages.videoPage}>
								<Badge
									variant='outline'
									color='violet'
									className='!border-transparent leading-none'>
									8
								</Badge>
							</NavItem>
							<NavItem {...appPages.aiAppPages.subPages.chatPages.subPages.audioPage}>
								<Badge
									variant='outline'
									color='blue'
									className='!border-transparent leading-none'>
									13
								</Badge>
							</NavItem>
							<NavItem {...appPages.aiAppPages.subPages.chatPages.subPages.codePage}>
								<Badge
									variant='outline'
									color='emerald'
									className='!border-transparent leading-none'>
									3
								</Badge>
							</NavItem>
						</NavCollapse>
					</NavCollapse>

					<NavCollapse
						text={appPages.crmAppPages.text}
						to={appPages.crmAppPages.to}
						icon={appPages.crmAppPages.icon}>
						<NavItem {...appPages.crmAppPages.subPages.crmDashboardPage} />
						<NavCollapse
							text={appPages.crmAppPages.subPages.customerPage.text}
							to={appPages.crmAppPages.subPages.customerPage.to}
							icon={appPages.crmAppPages.subPages.customerPage.icon}>
							<NavItem
								{...appPages.crmAppPages.subPages.customerPage.subPages.listPage}
							/>
							<NavItem
								{...appPages.crmAppPages.subPages.customerPage.subPages.editPage}
							/>
						</NavCollapse>
						<NavCollapse
							text={appPages.crmAppPages.subPages.rolePage.text}
							to={appPages.crmAppPages.subPages.rolePage.to}
							icon={appPages.crmAppPages.subPages.rolePage.icon}>
							<NavItem
								{...appPages.crmAppPages.subPages.rolePage.subPages.listPage}
							/>
							<NavItem
								{...appPages.crmAppPages.subPages.rolePage.subPages.editPage}
							/>
						</NavCollapse>
					</NavCollapse>
					<NavCollapse
						text={appPages.projectAppPages.text}
						to={appPages.projectAppPages.to}
						icon={appPages.projectAppPages.icon}>
						<NavItem {...appPages.projectAppPages.subPages.projectDashboardPage}>
							<NavButton
								title='New Project'
								icon='HeroPlusCircle'
								onClick={() => {
									router.push(
										`../${appPages.projectAppPages.subPages.projectBoardPageLink.to}/new`,
									);
								}}
							/>
						</NavItem>
						<NavItem {...appPages.projectAppPages.subPages.projectBoardPage}>
							<Badge
								variant='outline'
								color='emerald'
								className='border-transparent leading-none'>
								6
							</Badge>
						</NavItem>
					</NavCollapse>
					<NavItem
						text={appPages.mailAppPages.text}
						to={appPages.mailAppPages.subPages.inboxPages.to}
						icon={appPages.mailAppPages.icon}>
						<Badge
							variant='outline'
							color='emerald'
							className='border-transparent leading-none'>
							3
						</Badge>
						<NavButton
							icon='HeroPlusCircle'
							title='New Mail'
							onClick={() => {
								router.push(`../${appPages.mailAppPages.subPages.newMailPages.to}`);
							}}
						/>
					</NavItem>

					<NavSeparator />

					<NavTitle>Components & Templates</NavTitle>
					<NavCollapse
						text={componentsPages.integratedPages.text}
						to={componentsPages.integratedPages.to}
						icon={componentsPages.integratedPages.icon}>
						<NavItem {...componentsPages.integratedPages.subPages.reactDateRangePage} />
						<NavItem {...componentsPages.integratedPages.subPages.fullCalendarPage} />
						<NavItem {...componentsPages.integratedPages.subPages.apexChartsPage} />
						<NavItem
							{...componentsPages.integratedPages.subPages.reactSimpleMapsPage}
						/>
						<NavItem {...componentsPages.integratedPages.subPages.waveSurferPage} />
					</NavCollapse>

					<NavCollapse
						text={componentsPages.iconsPage.text}
						to={componentsPages.iconsPage.to}
						icon={componentsPages.iconsPage.icon}>
						<NavItem {...componentsPages.iconsPage} />
						<NavItem {...componentsPages.iconsPage.subPages.heroiconsPage}>
							<Badge
								variant='outline'
								color='violet'
								className='!border-transparent leading-none'>
								292
							</Badge>
						</NavItem>
						<NavItem {...componentsPages.iconsPage.subPages.duotoneIconsPage}>
							<Badge
								variant='outline'
								color='violet'
								className='!border-transparent leading-none'>
								640
							</Badge>
						</NavItem>
					</NavCollapse>
				</Nav>
			</AsideBody>
			<AsideFooter>
				<UserTemplate />
				<DarkModeSwitcherPart />
			</AsideFooter>
		</Aside>
	);
};

export default DefaultAsideTemplate;
