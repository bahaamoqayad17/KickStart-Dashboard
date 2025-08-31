'use client';

import React, { useEffect, useState } from 'react';
import SalesDashboardHeaderTemplate from '@/templates/layouts/Headers/SalesDashboardHeader.template';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Subheader, { SubheaderLeft, SubheaderRight } from '@/components/layouts/Subheader/Subheader';
import PeriodButtonsPartial from './_partial/PeriodButtons.partial';
import Container from '@/components/layouts/Container/Container';
import Balance1Partial from './_partial/Balance1.partial';
import Balance2Partial from './_partial/Balance2.partial';
import Balance3Partial from './_partial/Balance3.partial';
import Balance4Partial from './_partial/Balance4.partial';
import ChartPartial from './_partial/Chart.partial';
import CommentPartial from './_partial/Comment.partial';
import Card from '@/components/ui/Card';
import TablePartial from './_partial/Table.partial';
import TimelinePartial from './_partial/Timeline.partial';
import PERIOD, { TPeriod } from '@/constants/periods.constant';
import { DateRangePicker, Range } from 'react-date-range';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';
import Dropdown, { DropdownMenu, DropdownToggle } from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import colors from '@/tailwindcss/colors.tailwind';
import themeConfig from '@/config/theme.config';

const HomeClient = () => {
	const [activeTab, setActiveTab] = useState<TPeriod>(PERIOD.DAY);

	const [selectedDate, setSelectedDate] = useState<Range[]>([
		{
			startDate: dayjs().startOf('week').add(-1, 'week').toDate(),
			endDate: dayjs().endOf('week').toDate(),
			key: 'selection',
		},
	]);

	useEffect(() => {
		if (activeTab === PERIOD.DAY) {
			setSelectedDate([
				{
					startDate: dayjs().startOf('day').toDate(),
					endDate: dayjs().endOf('day').toDate(),
					key: 'selection',
				},
			]);
		}
		if (activeTab === PERIOD.WEEK) {
			setSelectedDate([
				{
					startDate: dayjs().startOf('week').toDate(),
					endDate: dayjs().endOf('week').toDate(),
					key: 'selection',
				},
			]);
		}
		if (activeTab === PERIOD.MONTH) {
			setSelectedDate([
				{
					startDate: dayjs().startOf('month').toDate(),
					endDate: dayjs().endOf('month').toDate(),
					key: 'selection',
				},
			]);
		}
		return () => {};
	}, [activeTab]);
	useEffect(() => {
		const selectedStart = dayjs(selectedDate[0].startDate).format('LL');
		const selectedEnd = dayjs(selectedDate[0].endDate).format('LL');

		if (
			selectedStart === dayjs().startOf('day').format('LL') &&
			selectedEnd === dayjs().endOf('day').format('LL')
		) {
			setActiveTab(PERIOD.DAY);
		}
		if (
			selectedStart === dayjs().startOf('week').format('LL') &&
			selectedEnd === dayjs().endOf('week').format('LL')
		) {
			setActiveTab(PERIOD.WEEK);
		}
		if (
			selectedStart === dayjs().startOf('month').format('LL') &&
			selectedEnd === dayjs().endOf('month').format('LL')
		) {
			setActiveTab(PERIOD.MONTH);
		}
		return () => {};
	}, [selectedDate]);

	const { locale } = useLocale();

	const activeLocale = locale;

	return (
		<>
			{/* Font Test - Remove this after testing */}
			<div className='mb-4 rounded-lg bg-white p-4 dark:bg-zinc-800'>
				<h2 className='mb-3 text-lg font-semibold'>Poppins Font Test</h2>
				<div className='space-y-2'>
					<p className='font-thin'>
						Thin (100) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-extralight'>
						Extra Light (200) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-light'>
						Light (300) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-normal'>
						Regular (400) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-medium'>
						Medium (500) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-semibold'>
						Semi Bold (600) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-bold'>
						Bold (700) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-extrabold'>
						Extra Bold (800) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='font-black'>
						Black (900) - The quick brown fox jumps over the lazy dog
					</p>
					<p className='italic'>Italic - The quick brown fox jumps over the lazy dog</p>
				</div>
			</div>
			<SalesDashboardHeaderTemplate />
			<PageWrapper>
				<Subheader>
					<SubheaderLeft>
						<PeriodButtonsPartial activeTab={activeTab} setActiveTab={setActiveTab} />
					</SubheaderLeft>
					<SubheaderRight>
						<Dropdown>
							<DropdownToggle>
								<Button icon='HeroCalendarDays'>
									{activeTab === PERIOD.DAY &&
										dayjs().locale("en").format('LL')}
									{activeTab === PERIOD.WEEK &&
										`${dayjs()
											.startOf('week')
											.locale("en")
											.format('MMMM D')} - ${dayjs()
											.endOf('week')
											.locale("en")
											.format('MMMM D, YYYY')}`}
									{activeTab === PERIOD.MONTH &&
										dayjs()
											.startOf('month')
											.locale("en")
											.format('MMMM, YYYY')}
								</Button>
							</DropdownToggle>
							<DropdownMenu className='!p-0'>
								<DateRangePicker
									onChange={(item: Range) => setSelectedDate([item.selection])}
									moveRangeOnFirstSelection={false}
									months={2}
									ranges={selectedDate}
									direction='horizontal'
									rangeColors={[
										colors[themeConfig.themeColor][themeConfig.themeColorShade] as string,
										colors.emerald[themeConfig.themeColorShade] as string,
										colors.amber[themeConfig.themeColorShade] as string,
									]}
									locale={activeLocale}
								/>
							</DropdownMenu>
						</Dropdown>
					</SubheaderRight>
				</Subheader>
				<Container>
					<div className='grid grid-cols-12 gap-4'>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance1Partial activeTab={activeTab} />
						</div>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance2Partial activeTab={activeTab} />
						</div>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance3Partial activeTab={activeTab} />
						</div>
						<div className='col-span-12 sm:col-span-6 lg:col-span-3'>
							<Balance4Partial activeTab={activeTab} />
						</div>

						<div className='col-span-12 2xl:col-span-8'>
							<ChartPartial />
						</div>
						<div className='col-span-12 2xl:col-span-4'>
							<CommentPartial />
						</div>

						<div className='col-span-12 2xl:col-span-8'>
							<Card className='h-full'>
								<TablePartial />
							</Card>
						</div>
						<div className='col-span-12 2xl:col-span-4'>
							<TimelinePartial />
						</div>
					</div>
				</Container>
			</PageWrapper>
		</>
	);
};

export default HomeClient;
