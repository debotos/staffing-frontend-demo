import styled from 'styled-components'

import variables from '../../config/vars'

const { PRIMARY_COLOR } = variables

export const TabHeadItem = styled.span`
	display: flex;
	span {
		margin: 0 5px;
		color: ${(props) => props.done === 'true' && PRIMARY_COLOR};
		svg {
			font-weight: bold;
			font-size: 20px;
		}
	}
`
