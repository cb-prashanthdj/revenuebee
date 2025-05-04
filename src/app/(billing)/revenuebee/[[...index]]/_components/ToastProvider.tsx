// components/ToastProvider.tsx
import React, { createContext, useContext, useState } from 'react';
import { SToast, SToastProvider, SToastViewport } from 'cb-sting-react-ts';
import { Button } from 'cb-sting-react-ts';

interface ToastContextType {
    showToast: (props: ToastProps) => void;
}

interface ToastProps {
    title: string;
    description: string;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const AppToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

    const showToast = (props: ToastProps) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setToasts((prevToasts) => [...prevToasts, { ...props, id }]);

        // Auto-dismiss toast after duration
        if (props.duration !== Infinity) {
            setTimeout(() => {
                dismissToast(id);
            }, props.duration || 5000);
        }
    };

    const dismissToast = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <SToastProvider>
                <SToastViewport>
                    {toasts.map((toast) => (
                        <SToast
                            key={toast.id}
                            duration={toast.duration || 5000}
                            position="bottomRight"
                            variant={"green"}
                            width="wide"
                            onDismiss={() => dismissToast(toast.id)}
                        >
                            <SToast.Wrapper align="start">
                                <SToast.Body>
                                    <SToast.Title>
                                        {toast.title}
                                    </SToast.Title>
                                    <SToast.Description>
                                        {toast.description}
                                    </SToast.Description>
                                </SToast.Body>
                            </SToast.Wrapper>
                            {toast.action && (
                                <SToast.Action
                                    altText=""
                                    asChild
                                    className="s-border-0"
                                >
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            toast.action?.onClick();
                                            dismissToast(toast.id);
                                        }}
                                    >
                                        {toast.action.label}
                                    </Button>
                                </SToast.Action>
                            )}
                        </SToast>
                    ))}
                </SToastViewport>
            </SToastProvider>
        </ToastContext.Provider>
    );
};

export default AppToastProvider;