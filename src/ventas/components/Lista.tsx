import React from 'react';

interface Item {
    id: string;
    codigo: string;
    nombre: string;
    precio: number;
    cantidad: number; // Agregamos la propiedad cantidad
}

interface ListaProps {
    items: Item[];
    onUpdateItem: (updatedItems: Item[]) => void; // Cambiado para aceptar un arreglo
}

const Lista: React.FC<ListaProps> = ({ items, onUpdateItem }) => {

    const handleCantidadChange = (itemId: string, newCantidad: number) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, cantidad: newCantidad } : item
        );
        onUpdateItem(updatedItems); // Actualizamos la lista de items
    };

    return (
        <div>
            <h2>Lista de Productos</h2>
            {items.length === 0 ? (
                <p>No hay productos para mostrar</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th> {/* Nueva columna */}
                        <th>Subtotal</th> {/* Nueva columna */}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.codigo}</td>
                            <td>{item.nombre}</td>
                            <td>${item.precio.toFixed(2)}</td>
                            <td>
                                <input
                                    type="number"
                                    value={item.cantidad}
                                    min="1"
                                    onChange={(e) => handleCantidadChange(item.id, Number(e.target.value))}
                                />
                            </td> {/* Campo de entrada para la cantidad */}
                            <td>${(item.precio * item.cantidad).toFixed(2)}</td> {/* Calculamos el subtotal */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Lista;