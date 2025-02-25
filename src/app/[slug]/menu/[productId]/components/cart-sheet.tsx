import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const {isOpen, toggleCart, products} = useContext(CartContext);

    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove you data from our servers.
                    </SheetDescription>
                </SheetHeader>
                {products.map((product) => (
                    <div key={product.id}>
                        <h1>{product.name}</h1>
                        <p>{product.price}</p>
                        <p>{product.quantity}</p>                      
                    </div>
                ))}
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;