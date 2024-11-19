import React from 'react';
interface Item { id: string; codigo: string; nombre: string; precio: number; cantidad: number; }
interface ListaProps { items: Item[]; onUpdateItem: (itemId: string, newCantidad: number) => void; }
const Lista: React.FC  = ({ items, onUpdateItem }) => {
    const handleCantidadChange = (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const newCantidad = Number(e.target.value);
        onUpdateItem(itemId, newCantidad);
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
                        <th>Cantidad</th>
                        <th>Subtotal</th>
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
                                    onChange={(e) => handleCantidadChange(item.id, e)}
                                />
                            </td>
                            <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default Lista;  