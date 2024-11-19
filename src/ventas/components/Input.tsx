import React, { useState } from 'react';
interface InputProps { onAddItem: (item: any) => void; }
const Input: React.FC  = ({ onAddItem }) => { const [codigo, setCodigo] = useState('');
    const handleChangeCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (codigo.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/ventas/buscar/codigo?codigo=${codigo}`);

                if (response.ok) {
                    const data = await response.json();

                    // Agregamos la cantidad por defecto
                    const newItem = { ...data, cantidad: 1 };
                    onAddItem(newItem);
                } else {
                    console.log('Producto no encontrado');
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            } finally {
                setCodigo('');
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
        </div>
    );
};
export default Input;  