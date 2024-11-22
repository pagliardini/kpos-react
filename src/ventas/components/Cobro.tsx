import React, { useEffect, useState } from 'react';
import './Cobro.css';

interface CobroProps {
    items: any[];
    inputTexto: string;
}

interface FormaCobro {
    id: number;
    denominacion: string;
    recargo: number;
}

const Cobro: React.FC<CobroProps> = ({ items, inputTexto }) => {
    const [formasCobro, setFormasCobro] = useState<FormaCobro[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    // Calcular el total de los productos
    useEffect(() => {
        const totalVenta = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setTotal(totalVenta);
    }, [items]);

    // Obtener formas de cobro desde el backend
    useEffect(() => {
        const obtenerFormasCobro = async () => {
            try {
                const response = await fetch('http://localhost:5000/ventas/formascobro');
                if (response.ok) {
                    const data = await response.json();
                    setFormasCobro(data);
                } else {
                    console.error('Error al obtener las formas de cobro:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener las formas de cobro:', error);
            }
        };

        obtenerFormasCobro();
    }, []);

    // Manejo de teclado para abrir el modal y navegar entre formas de cobro
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (formasCobro.length === 0) return;

            if (event.key === 'Enter' && items.length > 0 && inputTexto === '') {
                event.preventDefault();
                setShowModal(true);
            } else if (showModal) {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setSelectedIndex((prevIndex) => (prevIndex + 1) % formasCobro.length);
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setSelectedIndex((prevIndex) => (prevIndex - 1 + formasCobro.length) % formasCobro.length);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [formasCobro, items, inputTexto, showModal]);

    // Procesar la venta
    const procesarVenta = async () => {
        const productos = items.map(item => ({
            id: item.id,
            cantidad: item.cantidad,
        }));

        const formaCobro = formasCobro[selectedIndex]?.id;

        const payload = {
            productos,
            forma_cobro_id: formaCobro,
        };

        try {
            const response = await fetch('http://localhost:5000/ventas/procesar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Venta procesada exitosamente');
                setShowModal(false);
                // Aquí podrías limpiar los items o notificar al usuario
            } else {
                console.error('Error al procesar la venta:', response.statusText);
            }
        } catch (error) {
            console.error('Error al procesar la venta:', error);
        }
    };

    return (
        <div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowModal(false)}>
                            &times;
                        </button>
                        <h1>Total: ${total.toFixed(2)}</h1>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Forma de pago</th>
                                    <th>Recargo</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formasCobro.map((forma, index) => {
                                    const totalConRecargo = total + (total * (forma.recargo / 100));
                                    return (
                                        <tr
                                            key={index}
                                            data-index={index}
                                            className={index === selectedIndex ? 'selected' : ''}
                                            onClick={() => setSelectedIndex(index)}
                                        >
                                            <td>{forma.denominacion}</td>
                                            <td>{forma.recargo}%</td>
                                            <td>${totalConRecargo.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button onClick={procesarVenta} className="procesar-button">
                            Procesar Venta
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cobro;
