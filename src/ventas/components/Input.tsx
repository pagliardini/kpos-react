import React, { useState } from 'react';

interface InputProps {
    onSetItems: (items: any[]) => void;
    items: any[];
}

const Input: React.FC<InputProps> = ({ onSetItems, items }) => {
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChangeCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (codigo.trim()) {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/ventas/buscar/codigo?codigo=${codigo}`);

                if (response.ok) {
                    const data = await response.json();

                    // Verificamos si el producto ya está en la lista
                    const existingItemIndex = items.findIndex(item => item.id === data.id);
                    if (existingItemIndex !== -1) {
                        // Si ya existe, aumentamos la cantidad
                        const updatedItems = [...items];
                        updatedItems[existingItemIndex].cantidad += 1; // Aumentamos la cantidad
                        onSetItems(updatedItems); // Actualizamos la lista
                    } else {
                        // Si no existe, lo agregamos a la lista
                        const nuevoItem = { ...data, cantidad: 1 }; // Establecemos cantidad por defecto a 1
                        onSetItems([...items, nuevoItem]);
                    }
                } else {
                    console.log('Producto no encontrado');
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={codigo}
                    onChange={handleChangeCodigo}
                    placeholder="Ingresa el código"
                />
                <button type="submit">Buscar</button>
            </form>
            {loading && <p>Cargando...</p>}
        </div>
    );
};

export default Input;