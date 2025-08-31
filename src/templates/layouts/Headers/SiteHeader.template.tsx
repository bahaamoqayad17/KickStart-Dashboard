import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import SiteHeaderRightCommon from './_common/SiteHeaderRight.common';
import SiteSearchPartial from './_partial/SiteSearch.partial';

const SiteHeaderTemplate = () => {
	return (
		<Header>
			<HeaderLeft>
				<SiteSearchPartial />
			</HeaderLeft>
			<HeaderRight>
				<SiteHeaderRightCommon />
			</HeaderRight>
		</Header>
	);
};

export default SiteHeaderTemplate;
