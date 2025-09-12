import { useTheme } from '../../context/ThemeContext';
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
  // const { user } = useAuth();

  const renderContent = () => {
    switch (activePanel) {
      case "Dashboard":
        return <DashboardHome />;
      case "Transacciones-Crear":
        return <TransaccionCrear />;
      case "Transacciones-Recientes":
        return <TransaccionRecientes />;
      case "Transacciones-Buscar":
        return <TransaccionBuscar />;
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