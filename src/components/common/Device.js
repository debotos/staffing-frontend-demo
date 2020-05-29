import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children, start }) => {
	const isDesktop = useMediaQuery({ minWidth: start ? start : 992 })
	return isDesktop ? children : null
}

const MobileOrTablet = ({ children, end }) => {
	const isMobileOrTablet = useMediaQuery({ maxWidth: end ? end : 991 })
	return isMobileOrTablet ? children : null
}

export { Desktop, MobileOrTablet }
