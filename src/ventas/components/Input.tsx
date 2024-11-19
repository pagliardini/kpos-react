// src/components/Input.tsx
import React, { useState } from 'react';

interface InputProps {
    onAddItem: (item: any) => void;
    setInputTexto: (texto: string) => void;  // Prop para actualizar el estado de inputTexto en Ventas
}

const Input: React.FC<InputProps> = ({ onAddItem, setInputTexto }) => {
    const [codigo, setCodigo] = useState('');

    const handleChangeCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCodigo(value);
        setInputTexto(value);  // Actualizar el estado en Ventas
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
                setInputTexto('');  // Limpiar el estado en Ventas
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