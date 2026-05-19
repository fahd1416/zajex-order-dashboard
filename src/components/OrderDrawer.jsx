import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from 'lucide-react';

export function OrderDrawer({ order, isOpen, onClose }) {
  if (!order) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">Order: {order.order_id || 'N/A'}</SheetTitle>
          <SheetDescription>
            Detailed view of the order and logistics information.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* General Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
              General Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Store Name</span>
                <span className="text-sm font-medium">{order.store_name || '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Date & Time</span>
                <span className="text-sm font-medium">{order.order_date || '-'} {order.order_time}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Order Status</span>
                <div>
                  <Badge variant={order.order_status === 'pending' ? 'secondary' : 'default'} className="capitalize">
                    {order.order_status || 'pending'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
              Shipping Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1 col-span-2">
                <span className="text-xs text-muted-foreground">Shipping Company</span>
                <div className="flex items-center gap-2">
                  {order.shipping_company_logo && (
                    <img src={order.shipping_company_logo} alt="Logo" className="w-6 h-6 rounded" />
                  )}
                  <span className="text-sm font-medium">{order.shipping_company_name || '-'}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Shipment Status</span>
                <span className="text-sm font-medium capitalize">{order.shipment_status || '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Weight</span>
                <span className="text-sm font-medium">{order.shipment_weight ? `${order.shipment_weight} kg` : '-'}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              {order.shipping_from_url && (
                <Button variant="outline" className="w-full sm:w-auto text-muted-foreground" asChild>
                  <a href={order.shipping_from_url} target="_blank" rel="noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    Origin Map
                  </a>
                </Button>
              )}
              {order.shipping_to_url && (
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <a href={order.shipping_to_url} target="_blank" rel="noreferrer">
                    <Navigation className="mr-2 h-4 w-4" />
                    Destination Map
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1 col-span-2">
                <span className="text-xs text-muted-foreground">Customer Name</span>
                <span className="text-sm font-medium">{order.customer_name || '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Customer Phone</span>
                <span className="text-sm font-medium">{order.customer_phone || '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Merchant Phone</span>
                <span className="text-sm font-medium">{order.merchant_phone || '-'}</span>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="space-y-3 pb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
              Financial Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Order Value</span>
                <span className="text-sm font-medium">{order.order_value ? `${order.order_value} SAR` : '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Shipping Cost</span>
                <span className="text-sm font-medium">{order.shipping_cost ? `${order.shipping_cost} SAR` : '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">COD Amount</span>
                <span className="text-sm font-medium">{order.cod_amount ? `${order.cod_amount} SAR` : '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Total Amount</span>
                <span className="text-sm font-bold text-primary">{order.total_amount ? `${order.total_amount} SAR` : '-'}</span>
              </div>
              <div className="flex flex-col space-y-1 col-span-2 mt-2">
                <span className="text-xs text-muted-foreground">Payment Method</span>
                <span className="text-sm font-medium">{order.payment_method || '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Amount Paid</span>
                <span className="text-sm font-medium">{order.amount_paid !== null ? `${order.amount_paid} SAR` : '-'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Amount Remaining</span>
                <span className="text-sm font-medium">{order.amount_remaining !== null ? `${order.amount_remaining} SAR` : '-'}</span>
              </div>
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
