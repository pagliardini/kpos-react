// src/components/Total.tsx
import React from 'react';

interface TotalProps {
    items: { precio: number, cantidad: number }[]; // Cambia el tipo según sea necesario
}

const Total: React.FC<TotalProps> = ({ items }) => {
    const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <div>
            <h2>Total</h2>
            <p>${total.toFixed(2)}</p>
        </div>
    );
};

export default Total;