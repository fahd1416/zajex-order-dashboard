import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function OrdersTable({ orders, onRowClick }) {
  const handleMapClick = (e, url) => {
    e.stopPropagation();
    if (url) window.open(url, '_blank');
  };

  const handleWhatsAppClick = (e, phone) => {
    e.stopPropagation();
    if (phone) {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      window.open(`https://wa.me/${cleanPhone}`, '_blank');
    }
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'default'; // In Shadcn, default is usually primary color. We can customize or use secondary.
      case 'pending':
        return 'secondary';
      case 'cancelled':
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPaymentVariant = (status) => {
    return status?.toLowerCase() === 'paid' ? 'default' : 'secondary';
  };

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id} 
                onClick={() => onRowClick(order)}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">{order.order_id || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.order_date || 'N/A'}</span>
                    <span className="text-xs text-muted-foreground">{order.order_time}</span>
                  </div>
                </TableCell>
                <TableCell>{order.customer_name || 'N/A'}</TableCell>
                <TableCell>{order.store_name || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.order_status)} className="capitalize">
                    {order.order_status || 'pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPaymentVariant(order.payment_status)} className="capitalize">
                    {order.payment_status || 'pending'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {order.total_amount ? `${order.total_amount} SAR` : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 hover:text-blue-500"
                      onClick={(e) => handleMapClick(e, order.shipping_to_url)}
                      title="View Destination on Map"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 hover:text-green-500"
                      onClick={(e) => handleWhatsAppClick(e, order.customer_phone)}
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
