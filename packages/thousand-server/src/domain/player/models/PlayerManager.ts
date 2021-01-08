import { ID } from '@thousand/common/src/types';
import Player from './Player';

const playerManager = new Map<ID, Player>();

export default playerManager;
