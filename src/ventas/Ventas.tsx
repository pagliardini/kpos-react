import React, { useState } from 'react';
import Input from './components/Input.tsx';
import Lista from './components/Lista.tsx';

const Ventas: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);  // Estado para mantener la lista de productos

    const handleSetItems = (newItems: any[]) => {
        setItems(newItems);  // Función para agregar los productos
    };

    const handleUpdateItem = (updatedItems: any[]) => {
        setItems(updatedItems); // Actualiza los items cuando cambia la cantidad
    };

    return (
        <div>
            <h1>Página de Ventas</h1>
            <Input onSetItems={handleSetItems} items={items} />  {/* Pasamos items y onSetItems */}
            <Lista items={items} onUpdateItem={handleUpdateItem} />  {/* Mostramos la lista de productos */}
        </div>
    );
};

export default Ventas;