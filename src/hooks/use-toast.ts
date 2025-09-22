"use client";

import { toast as sonnerToast, Toaster } from "sonner";
import * as React from "react";

// Define types similar to the original ToastProps
type ToastActionElement = React.ReactElement;

interface ToastProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
    variant?: "default" | "destructive" | "success" | "error" | "info" | "warning";
    duration?: number;
    onOpenChange?: (open: boolean) => void;
}

interface Toast extends ToastProps {
    id: string | number;
}

// Sonner toast function wrapper
function toast({ variant = "default", ...props }: Omit<Toast, "id">) {
    const toastOptions = {
        duration: props.duration ?? 4000, // Default duration
        className: variant === "destructive" ? "destructive-toast" : undefined,
        onDismiss: props.onOpenChange ? () => props.onOpenChange?.(false) : undefined,
        action: props.action ? {
            label: (props.action as any).props?.children || "Action",
            onClick: (props.action as any).props?.onClick || (() => { }),
        } : undefined,
    };

    const id = sonnerToast(
        props.title?.toString() || "",
        {
            description: props.description?.toString(),
            ...toastOptions,
        }
    );

    return {
        id,
        dismiss: () => sonnerToast.dismiss(id),
        update: (newProps: Partial<Toast>) =>
            sonnerToast(
                newProps.title?.toString() || props.title?.toString() || "",
                {
                    id, // Update the existing toast
                    description: newProps.description?.toString() || props.description?.toString(),
                    duration: newProps.duration ?? props.duration ?? 4000,
                    className: newProps.variant === "destructive" ? "destructive-toast" : undefined,
                    onDismiss: newProps.onOpenChange ? () => newProps.onOpenChange?.(false) : props.onOpenChange ? () => props.onOpenChange?.(false) : undefined,
                    action: newProps.action ? {
                        label: (newProps.action as any).props?.children || "Action",
                        onClick: (newProps.action as any).props?.onClick || (() => { }),
                    } : props.action ? {
                        label: (props.action as any).props?.children || "Action",
                        onClick: (props.action as any).props?.onClick || (() => { }),
                    } : undefined,
                }
            ),
    };
}

// Custom hook to use Sonner toasts
function useToast() {
    return {
        toast,
        dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
        toasts: [], // Placeholder for compatibility; Sonner manages state internally
    };
}

export { useToast, toast, Toaster };