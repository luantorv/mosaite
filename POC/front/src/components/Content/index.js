import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import DashboardHome from './DashboardHome';
import TransaccionCrear from './TransaccionCrear';
import TransaccionRecientes from './TransaccionRecientes';
import TransaccionBuscar from './TransaccionBuscar';
import LibroDiarioBuscar from './LibroDiarioBuscar';
import LibroDiarioCrear from './LibroDiarioCrear';
import LibroDiarioRecientes from './LibroDiarioRecientes';
import CuentaCrear from './CuentaCrear';
import UsuariosLista from './UsuariosLista';
import EstadisticasPanel from './EstadisticasPanel';

function Content({ activePanel }) {
  const { theme } = useTheme();
  const { user } = useAuth();

  // Estado compartido para transacciones
  const [transacciones, setTransacciones] = useState([]);

  // Funciones para manejar transacciones
  const agregarTransaccion = (nuevaTransaccion) => {
    const transaccionConId = {
      ...nuevaTransaccion,
      id: Date.now() + Math.random(), // ID único
      fechaCreacion: new Date().toISOString(),
      author: user?.name || user?.email || 'Usuario Anónimo'
    };
    setTransacciones(prev => [transaccionConId, ...prev]);
    return transaccionConId;
  };

  const eliminarTransaccion = (id) => {
    setTransacciones(prev => prev.filter(t => t.id !== id));
  };

  // Agregar estas funciones después de eliminarTransaccion
  const actualizarEstadoTransaccion = (id, nuevoEstado) => {
    setTransacciones(prev => 
      prev.map(transaccion => 
        transaccion.id === id 
          ? { ...transaccion, estado: nuevoEstado }
          : transaccion
      )
    );
  };

  const editarTransaccion = (transaccion) => {
    console.log('Editar transacción:', transaccion);
    // Hacer después
  };

  const buscarTransacciones = (criterios) => {
    return transacciones.filter(transaccion => {
      if (criterios.fecha) {
        if (transaccion.fecha !== criterios.fecha) return false;
      }
      if (criterios.descripcion) {
        if (!transaccion.descripcion.toLowerCase().includes(criterios.descripcion.toLowerCase())) return false;
      }
      if (criterios.monto) {
        const totalTransaccion = transaccion.Entradas.reduce((sum, [_, monto]) => sum + monto, 0);
        if (totalTransaccion < criterios.monto) return false;
      }
      return true;
    });
  };


  // Plan de cuentas simulado
  const plan = [
    [11101, "Caja"],
    [11102, "Banco XX Cuenta Corriente"],
    [11103, "Banco XX Caja de Ahorro"],
    [11104, "Valores a depositar"],
    [11105, "Fondo Fijo"],
    [11201, "Moneda extranjera"],
    [11301, "Documentos a cobrar"],
    [11302, "Deudores por ventas"],
    [11303, "Deudores morosos"],
    [11304, "Deudores en gestión judicial"],
    [11401, "Alquileres pagados por adelantado"],
    [11402, "Gastos pagados por adelantado"],
    [11403, "IVA Crédito Fiscal"],
    [11404, "IVA Saldo a favor"],
    [11501, "Mercaderías"],
    [11502, "Anticipo a proveedores"],

    [12101, "Inmuebles"],
    [12102, "Maquinarias y equipos"],
    [12103, "Rodados"],
    [12104, "Muebles y útiles"],
    [12105, "Instalaciones"],
    [12201, "Patentes"],
    [12202, "Marcas"],
    [12203, "Software"],
    [12204, "Costo de organización"],
    [21101, "Proveedores"],
    [21102, "Documentos a pagar"],
    [21201, "Deudas bancarias a pagar"],
    [21202, "Tarjeta de Crédito XX a pagar"],
    [21301, "Sueldos a pagar"],
    [21302, "Contribuciones sociales a pagar"],
    [21303, "S.A.C. a pagar"],
    [21401, "IVA Débito Fiscal"],
    [21402, "IVA Saldo a pagar"],
    [21403, "Impuestos a pagar"],
    [21404, "Retenciones a pagar"],
    [21501, "Anticipo a clientes"],
    [21601, "Alquileres a pagar"],
    [21602, "Seguros a pagar"],
    [21603, "Comisiones a pagar"],
    [22101, "Deudas comerciales"],
    [22102, "Préstamos"],
    [22103, "Otros pasivos"],
    [31101, "Capital Social"],
    [31102, "Aportes por capitalizar"],
    [31201, "Reserva Legal"],
    [31202, "Reserva Estatutaria"],
    [31203, "Otras reservas"],
    [31301, "Resultados del ejercicio"],
    [31302, "Resultados No Asignados"]
];

  const renderContent = () => {
    switch (activePanel) {
      case "Dashboard":
        return <DashboardHome />;
      case "Transacciones-Crear":
        return (<TransaccionCrear 
            plan={plan} 
            onCrearTransaccion={agregarTransaccion}
          />);
      case "Transacciones-Recientes":
        return (
          <TransaccionRecientes 
            transacciones={transacciones}
            plan={plan}
            onEliminar={eliminarTransaccion}
            onActualizarEstado={actualizarEstadoTransaccion}
            onEditar={editarTransaccion}
          />
        );
      case "Transacciones-Buscar":
        return (
          <TransaccionBuscar 
            transacciones={transacciones}
            onBuscar={buscarTransacciones}
          />
        );
      case "Libros Diarios-Crear":
        return <LibroDiarioCrear />;
      case "Libros Diarios-Recientes":
        return <LibroDiarioRecientes />;
      case "Libros Diarios-Buscar":
        return <LibroDiarioBuscar />;
      case "Cuentas-Crear":
        return <CuentaCrear />;
      case "Usuarios-Ver todos":
        return <UsuariosLista />;
      case "Estadísticas-Panel":
        return <EstadisticasPanel />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div 
      style={{
        background: theme.background,
        //borderRadius: "15px",
        //boxShadow: theme.cardShadowIn,
        padding: "25px",
        height: "100%",
        marginTop: "20px",
        overflow: "auto"
      }}
    >
      {renderContent()}
    </div>
  );
}

export default Content;