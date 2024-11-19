// src/Ventas.tsx
import React, { useState } from 'react';
import Input from './components/Input';
import Lista from './components/Lista';
import Cobro from './components/Cobro';
import Total from './components/Total';

interface Item {
    id: string;
    codigo: string;
    nombre: string;
    precio: number;
    cantidad: number;
}

const Ventas: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [inputTexto, setInputTexto] = useState<string>('');

    const handleAddItem = (newItem: Item) => {
        const existingItemIndex = items.findIndex(item => item.id === newItem.id);
        if (existingItemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[existingItemIndex].cantidad += 1;
            setItems(updatedItems);
        } else {
            setItems([...items, newItem]);
        }
    };

    const handleUpdateItem = (itemId: string, newCantidad: number) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, cantidad: newCantidad } : item
        );
        setItems(updatedItems);
    };

    return (
        <div>
            <Input onAddItem={handleAddItem} setInputTexto={setInputTexto} />
            <Lista items={items} onUpdateItem={handleUpdateItem} />
            <Total items={items} />
            <Cobro items={items} inputTexto={inputTexto} />
        </div>
    );
};

export default Ventas;