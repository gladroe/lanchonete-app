import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING: return "Pendente";
        case OrderStatus.CONFIRMED: return "Confirmado";
        case OrderStatus.CANCELED: return "Cancelado";
        case OrderStatus.IN_PREPARATION: return "Em preparo";
        case OrderStatus.IN_DELIVERY: return "Em rota de entrega";
        case OrderStatus.DELIVERED: return "Entregue";
        case OrderStatus.FINISHED: return "Pedido Finalizado";
        default: return "";
    }
}

const OrderList = ({ orders }: OrderListProps) => {
    return ( 
        <div className="space-y-6 p-6">
            <Button size="icon" variant="secondary" className="rounded-full">
                <ChevronLeftIcon />
            </Button>
            <div className="flex items-center gap-3">
                <ScrollTextIcon />
                <h2 className="text-lg font-semibold">Meus Pedidos</h2>
            </div>
            {orders.map((order) => (
                <Card key={order.id}>
                    <CardContent className="p-5 space-y-4">
                        <div className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white
                            ${order.status === OrderStatus.PENDING ? "bg-amber-500 text-gray-100" : "bg-gray-200 text-gray-500"}
                            ${order.status === OrderStatus.CONFIRMED ? "bg-green-500 text-gray-100" : "bg-gray-200 text-gray-500"}
                            ${order.status === OrderStatus.CANCELED ? "bg-red-500 text-gray-100" : "bg-gray-200 text-gray-500"}
                            ${order.status === OrderStatus.IN_PREPARATION ? "bg-orange-500 text-gray-100" : "bg-gray-200 text-gray-500"}
                            ${order.status === OrderStatus.IN_DELIVERY ? "bg-purple-500 text-gray-100" : "bg-gray-200 text-gray-500"}
                            ${order.status === OrderStatus.DELIVERED ? "bg-green-500 text-gray-100" : "bg-gray-200 text-gray-500"}
                            ${order.status === OrderStatus.FINISHED ? "bg-blue-500 text-gray-100" : "bg-gray-200 text-gray-500"}
                            `}>
                            {getStatusLabel(order.status)}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative h-5 w-5">
                                <Image
                                    src={order.restaurant.avatarImageUrl}
                                    alt={order.restaurant.name}
                                    className="rounded-sm"
                                    fill
                                />
                            </div>
                            <p className="font-semibold text-sm">{order.restaurant.name}</p>
                        </div>
                        <Separator />
                        <div className="space-y-2 flex flex-col">
                             {order.orderProducts.map(orderProduct => (
                                 <div key={orderProduct.id} className="flex items-center gap-2 justify-between">
                                     <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-semibold">
                                            {orderProduct.quantity}
                                        </div>
                                            <p className="text-sm max-w-[90%] truncate text-ellipsis">{orderProduct.product.name}</p>
                                     </div>
                                     <div className="font-medium">
                                        <p>{formatCurrency(orderProduct.product.price)}</p>
                                     </div>  
                                   
                                </div>
                               
                            ))}
                       </div>
                        <Separator />
                        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
     );
}
 
export default OrderList;