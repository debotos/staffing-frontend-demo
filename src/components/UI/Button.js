import { Button } from 'antd'
import styled from 'styled-components'

const Btn = styled(Button)`
	border-radius: 4px;
	color: ${(props) => (props.color ? props.color : '#fff')};
	background-color: ${(props) => (props.bgcolor ? props.bgcolor : '#677B87')};
`
export default Btn
