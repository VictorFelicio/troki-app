import { ITrade } from '../Trade/trade.entity';
import { IUser } from '../User/user.entity';

export interface IMessage {
    id: string;
    tradeId: ITrade['id'];
    senderId: IUser['id'];
    text: string;
    createdAt: Date;
}
