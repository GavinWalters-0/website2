'use client';

import { useEffect, useState } from 'react';

export default function useMobile() {
	const [mobile, setMobile] = useState(false);

	useEffect(() => {
		const query = window.matchMedia('(min-width: 1024px)');
		setMobile(!query.matches);
		const onChange = () => {
			setMobile(!query.matches);
		};
		query.addEventListener('change', onChange);
		return () => {
			query.removeEventListener('change', onChange);
		};
	}, []);

	return mobile;
}
