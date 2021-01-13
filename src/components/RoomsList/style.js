import styled from 'styled-components';

import { Button, List } from '@material-ui/core'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	max-width: 300px;
	min-width: 200px;
	width: 20%;
`;

export const RoomsWrapper = styled(List)`
	padding: .5rem;
	flex-grow: 1;
`;

export const CreateRoomButton = styled(Button)`
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	width: 100%;	
`