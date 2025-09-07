import { IProduct } from '../Product/product.entity';
import { IUser } from '../User/user.entity';
import { TradeStatus } from './enum/trade-status.enum';

export interface ITrade {
    id: string;
    requesterId: IUser['id'];
    receiverId: IUser['id'];
    productRequestedId: IProduct['id'];
    productOfferedId: IProduct['id'];
    status: TradeStatus;
    createdAt: Date;
    updatedAt: Date;
}
