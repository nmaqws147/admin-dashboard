import React, { ReactNode, createContext , useContext, useState} from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './img/favicon.png';
import {
  BsCart,
  BsCalendar,
  BsPeople,
  BsPersonBadge,
  BsBoxSeam,
  BsPieChart,
  BsGraphUp,
  BsBarChart,
  BsTriangle,
  BsCurrencyDollar,
  BsPencil,
  BsKanban,
  BsPalette,
  BsLine,
} from "react-icons/bs";
const sideBarContext = createContext<any>(null);
export const useSideBar = () => useContext(sideBarContext);
const Sidebar = () => {
  const {isOpen} = useSideBar();
  return (
    <div 
      className="side-bar d-flex flex-column flex-shrink-0 p-3 scroll-area" 
      style={{
        width: isOpen ? "240px" : "0",
        position: "fixed",
        top:0,
        left:isOpen ? '0' : '-40px',
        height: '100vh',
        transition: '0.5s ease all',
        overflowY: 'scroll',
      }}
    >
      <div className="d-flex flex-row gap-1 mt-3 sidebar-content me-5 mb-4 ms-4">
        <img src={Logo} alt="logo" className="logo"/>
        <h5>StyleHaven</h5>
      </div>
      <div className="d-flex flex-column">
        <div>
          <p style={{fontSize:"0.8rem",opacity:"0.6"}}>DASHBOARD</p>
          <div className="ecommerce-btn sidebar-item d-flex flex-row h-50 align-items-center ps-3 rounded mt-3">
          <BsCart className="d-flex my-2 me-2"/>
          <Link to="/" className="text-decoration-none text-dark"><p className="sidebar-item mt-3">E-commerce</p></Link>
          </div>
        </div>
        <div>
          <p  style={{fontSize:"0.8rem",opacity:"0.6"}}>APPS</p>
          <div className="calendar-btn sidebar-item ps-3 py-2 mb-3 rounded d-flex flex-row ">
          <BsCalendar className="d-flex my-1 me-2"/>
          <Link to="calendar" className="text-decoration-none text-dark"><p className=" sidebar-item mt-0">Calendar</p></Link>
          </div>
          <div className="editor-btn sidebar-item ps-3 py-2 rounded d-flex flex-row mb-3">
          <BsPencil className="d-flex my-1 me-2"/>
          <Link to="editor" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Editor</p></Link>
          </div>
          <div className="kanban-btn sidebar-item ps-3 py-2 rounded d-flex flex-row mb-3">
          <BsKanban className="d-flex my-1 me-2"/>
          <Link to="kanban" className="text-decoration-none text-dark"><p className="sidebar-item">Kanban</p></Link>
          </div>
          <div className="kanban-btn sidebar-item ps-3 py-2 rounded d-flex flex-row mb-3">
          <BsPalette className="d-flex my-1 me-2"/>
          <Link to="color" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Color Picker</p></Link>
          </div>
        </div>
      <div>
        <p style={{fontSize:"0.8rem",opacity:"0.6"}}>PAGES</p>
        <div className="orders-btn  sidebar-item ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsBoxSeam className="d-flex my-1 me-2"/>
        <Link to="orders" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Orders</p></Link>
        </div>
        <div className="employees-btn sidebar-item ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsPersonBadge className="d-flex my-1 me-2"/>
        <Link to="employees" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Employees</p></Link>
        </div>
        <div className="customers-btn sidebar-item ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsPeople className="d-flex my-1 me-2"/>
        <Link to="customers" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Customers</p></Link>
        </div>
      </div>
      <div>
        <p style={{fontSize:"0.8rem",opacity:"0.6"}}>CHARTS</p>
        <div className="line-btn sidebar-item ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsLine className="d-flex my-1 me-2"/>        
        <Link to="line" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Line</p></Link>
        </div>
        <div className="pie-btn sidebar-item  ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsPieChart className="d-flex my-1 me-2"/> 
        <Link to="pie" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Pie</p></Link>
        </div>
        <div className="bar-btn sidebar-item  ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsBarChart className="d-flex my-1 me-2" />
        <Link to="bar" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Bar</p></Link>
        </div>
        <div className="financial-btn sidebar-item  ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsGraphUp className="d-flex my-1 me-2"/>
        <Link to="area" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Climate Chart</p></Link>
        </div>
        <div className="financial-btn sidebar-item  ps-3 py-2 rounded d-flex flex-row mb-3">
        <BsCurrencyDollar className="d-flex my-1 me-2"/>
        <Link to="financial" className="text-decoration-none text-dark"><p className="sidebar-item mb-3">Financial</p></Link>
        </div>
      </div>
        </div>
      </div>
  );
};
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);
  return (
    <sideBarContext.Provider value={{ isOpen,toggleSidebar }}>
      {children}
    </sideBarContext.Provider>
  );
}
export default Sidebar;