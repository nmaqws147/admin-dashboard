

import './App.css';
import { SidebarProvider } from './components/sidebar';
import { HashRouter,Route,Routes} from 'react-router-dom';
import MyNavbar from './components/navbar';
import medalData from './components/usersmanagment/medals.json';
import Sidebar from './components/sidebar';
import Ecommerce from './components/usersmanagment/Ecommerce';
import Calendar from './components/usersmanagment/Calendar';
import MyEditor from './components/usersmanagment/Editor';
import Kanban from './components/usersmanagment/Kanban';
import Color from './components/usersmanagment/Color';
import Orders from './components/usersmanagment/Orders';
import Employees from './components/usersmanagment/Employees';
import Customers from './components/usersmanagment/Customers';
import BarChart from './components/usersmanagment/charts/Bar';
import LineChart from './components/usersmanagment/charts/Line';
import ClimateChart from './components/usersmanagment/charts/weather';
import PieChart from './components/usersmanagment/charts/Pie';
import Pyramide from './components/usersmanagment/charts/Pyramide';
import FinancialChart from './components/usersmanagment/charts/financial';
import {useState,useEffect} from 'react';

export interface Financial{
  market_caps:[
    number,
    number,
  ],
  prices:[
    number,
    number,
  ],
  total_volumes:[
    number,
    number,
  ],
}
interface MedalCounts {
    bronze: number,
    silver: number,
    gold: number,
  }
  
  export interface Medals {
    Egypt: MedalCounts,
    Germany: MedalCounts,
    USA: MedalCounts,
  }
export interface Product{
  discountPercentage: number,
      discountedTotal: number,
      id: number,
      price: number,
      quantity: number,
      thumbnail: string,
      title: string,
      total: number
}
export interface Reviews{
  comment:string,
  date:string,
  rating:number,
  reviewerEmail:string,
  reviewerName:string
}
export interface User{
    discountPercentage: number,
    discountedTotal: number,
    id: number,
    products: Product[],
    total: number,
    totalProducts: number,
    totalQuantity: number,
    userId: number
  }
export interface Products {
  availabilityStatus:string,
  brand:string,
  description:string,
  category:string,
  dimensions:{
    dipth:number,
    height:number
    width:number,
  }
  discountPercentage:number,
  id:number,
  images:[
    string
  ],
  meta:{
    barcode: string,
    createdAt: string,
    qrCode:string,
    updatedAt: string,
  },
  minimumOrderQuantity:number,
  price:number,
  rating:number,
  returnPolicy:string,
  reviews:Reviews[],
  shippingInformation:string,
  sku:string,
  stock:number,
  tags:string[],
  thumbnail:string,
  title:string,
  warrantyInformation:string
  weight:number
}
export interface Users{
  address:{
    address: string,
    city: string,
    coordinates:{
      lat:number,
      lag:number,
    }
    country: string,
    postalCode: string,
    state: string,
    stateCode: string,
  }
  age:number,
  bank:{
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string,
  }
  birthDate: string,
  bloodGroup: string,
  company:{
    address:{
      address: string
      city: string,
      coordinates:{
        lat:number,
        lng:number,
      },
      country: string,
      postalCode: string,
      state: string,
      stateCode: string,
    }
    department: string,
    name: string,
    title: string,
  }
  crypto:{
    coin: string,
    network: string,
    wallet: string,
  }
  ein: string,
  email: string, 
  eyeColor: string,
  firstName: string,
  gender: string,
  hair:{
    color: string,
    type: string,
  },
  height: number
  id: number
  image: string,
  ip: string,
  lastName: string,
  macAddress: string,
  maidenName: string,
  password: string,
  phone: string,
  role: string,
  ssn: string,
  university: string,
  userAgent: string,
  username: string,
  weight: number,
}
export interface Inflation{
  country:{
    id:string,
    value:string,
  }
  countryiso3code:string,
  date:string,
  decimal:number,
  indicator:{
    id:string,
    value:string
  }
  obs_status: string
  unit: string,
  value: number
}
export interface Weather{
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    time: string[],
}
const App:React.FC = () => {
  const [earning,setEarning] = useState<User[]>([]);
  const [products,setProducts] = useState<Products[]>([]);
  const [users,setUsers] = useState<Users[]>([]);
  const [inflation,setInflation] = useState<Inflation[]>([]);
  const [medals,setMedals] = useState<Medals[]>([]);
  const [financial,setFinancial] = useState<[number,number][]>([]);
  const [weather,setWeather] = useState<Weather|undefined>()
  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then(res => res.json())
      .then((data) => setEarning(data.carts));
  },[])
  useEffect(() => {
    fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then((data) => setProducts(data.products));
  },[])
  useEffect(() => {
    fetch("https://dummyjson.com/users")
    .then(res => res.json())
    .then(data => setUsers(data.users))
  },[])
  useEffect(() => {
    fetch('https://api.worldbank.org/v2/country/EG;US;DE/indicator/FP.CPI.TOTL.ZG?format=json&per_page=300')
    .then(res => res.json())
    .then(data => setInflation(data[1]));
  },[])
  useEffect(() => {
    setMedals(medalData)
  },[]);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30')
      .then(res => res.json())
      .then(data => setFinancial(data.prices))
      .catch(err => console.error("Error fetching prices", err));
  }, []);
  useEffect(() => {
    fetch("https://archive-api.open-meteo.com/v1/archive?latitude=38.0&longitude=-97.0&start_date=2024-01-01&end_date=2024-12-31&daily=temperature_2m_max,temperature_2m_min&timezone=America/New_York")
    .then(res => res.json())
    .then(data => setWeather(data.daily));
  },[])
    return (
    <HashRouter>
      <SidebarProvider>
        <div className="app-container">
          <MyNavbar />
          <div className="content-wrapper">
            <Sidebar />
            <div className="main-content">
            <Routes>
              <Route path="/" element={<Ecommerce earning={earning}/>} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/customers" element={<Customers users={users}/>} />
              <Route path="/color" element={<Color />} />
              <Route path="/editor" element={<MyEditor />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/orders" element={<Orders products={products}/>} />
              <Route path="/employees" element={<Employees users={users}/>} />
              <Route path="/bar" element={<BarChart medals={medals}/>} />
              <Route path="/line" element={<LineChart inflation={inflation}/>} />
              {weather && <Route path="/area" element={<ClimateChart weather={weather}/>} />}
              <Route path="/pyramide" element={<Pyramide />} />
              <Route path="/pie" element={<PieChart products={products}/>} />
              <Route path="/financial" element={<FinancialChart financial={financial}/>} />
            </Routes>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </HashRouter>
  );
}
export default App;