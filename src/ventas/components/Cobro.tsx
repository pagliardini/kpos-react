import React, { useEffect, useState } from 'react';
import './Cobro.css';

interface CobroProps {
    items: any[];
    inputTexto: string;
}

interface FormaCobro {
    denominacion: string;
    recargo: number;
    pagaCon: number;
}

const Cobro: React.FC<CobroProps> = ({ items, inputTexto }) => {
    const [formasCobro, setFormasCobro] = useState<FormaCobro[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

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

    useEffect(() => {
        const handleArrowKeys = (event: KeyboardEvent) => {
            if (formasCobro.length > 0) {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    if (event.key === 'ArrowDown') {
                        const newIndex = (selectedIndex + 1) % formasCobro.length;
                        setSelectedIndex(newIndex);
                    } else if (event.key === 'ArrowUp') {
                        const newIndex = (selectedIndex - 1 + formasCobro.length) % formasCobro.length;
                        setSelectedIndex(newIndex);
                    }
                }
            }
        };

        const handleEnterPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && items.length > 0 && inputTexto === '') {
                event.preventDefault();
                const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
                setTotal(total);
                setShowModal(true);
            }
        };

        window.addEventListener('keydown', handleArrowKeys);
        window.addEventListener('keydown', handleEnterPress);

        return () => {
            window.removeEventListener('keydown', handleArrowKeys);
            window.removeEventListener('keydown', handleEnterPress);
        };
    }, [formasCobro, selectedIndex, items, inputTexto]);

    useEffect(() => {
        if (showModal) {
            // Enfoca en el input de "Paga Con" de la fila seleccionada
            const selectedInput = document.querySelector(`tr[data-index='${selectedIndex}'] .paga-con`) as HTMLInputElement;
            if (selectedInput) {
                selectedInput.focus();
                selectedInput.select();
            }
        }
    }, [showModal, selectedIndex]);

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const totalConRecargo = parseFloat(target.getAttribute('data-total')!);
        const pago = parseFloat(target.value) || 0;
        const vuelto = (pago - totalConRecargo).toFixed(2);
        document.getElementById('vuelto')!.textContent = `Vuelto: $${vuelto}`;
    };

    return (
        <div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleModalClose}>&times;</span>
                        <h1>Total: ${total.toFixed(2)}</h1>
                        <h1 id="vuelto" class="vuelto">Vuelto: $0.00</h1>
                        <table style={{ width: '100%' }}>
                            <thead>
                            <tr>
                                <th>Forma de pago</th>
                                <th>Recargo</th>
                                <th>Total</th>
                                <th>Paga Con</th>
                            </tr>
                            </thead>
                            <tbody id="cobro-body">
                            {formasCobro.map((forma, index) => {
                                const totalConRecargo = total + (total * (forma.recargo / 100));
                                return (
                                    <tr key={index} data-index={index} className={index === selectedIndex ? 'selected' : ''}>
                                        <td>{forma.denominacion}</td>
                                        <td>{forma.recargo}%</td>
                                        <td>${totalConRecargo.toFixed(2)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="paga-con"
                                                data-total={totalConRecargo.toFixed(2)}
                                                defaultValue={totalConRecargo.toFixed(2)}
                                                onFocus={(e) => e.target.select()}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cobro;