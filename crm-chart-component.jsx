import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample data representing customer growth over time
const initialData = [
  { month: 'Jan', customers: 1200, leads: 800, retention: 88 },
  { month: 'Feb', customers: 1350, leads: 920, retention: 89 },
  { month: 'Mar', customers: 1500, leads: 1050, retention: 90 },
  { month: 'Apr', customers: 1640, leads: 1180, retention: 91 },
  { month: 'May', customers: 1800, leads: 1300, retention: 92 },
  { month: 'Jun', customers: 2100, leads: 1450, retention: 93 },
];

export default function CRMDashboardChart() {
  const [data, setData] = useState(initialData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartType, setChartType] = useState('growth');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = data.map(item => ({
        ...item,
        customers: item.customers + Math.floor(Math.random() * 50),
        leads: item.leads + Math.floor(Math.random() * 30),
        retention: Math.min(100, item.retention + (Math.random() * 0.5))
      }));
      setData(newData);
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  // Rotate between different chart views
  useEffect(() => {
    const chartTypes = ['growth', 'leads', 'retention'];
    const interval = setInterval(() => {
      setChartType(chartTypes[(chartTypes.indexOf(chartType) + 1) % chartTypes.length]);
    }, 5000);

    return () => clearInterval(interval);
  }, [chartType]);

  // Animate highlight on different data points
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, data.length]);

  const renderGrowthChart = () => (
    <>
      <div className="chart-title">Customer Growth</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: '#2a2a3b', border: 'none', borderRadius: '8px' }} />
          <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="url(#colorCustomers)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );

  const renderLeadsChart = () => (
    <>
      <div className="chart-title">Lead Generation</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: '#2a2a3b', border: 'none', borderRadius: '8px' }} />
          <Line type="monotone" dataKey="leads" stroke="#4ecdc4" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );

  const renderRetentionChart = () => (
    <>
      <div className="chart-title">Customer Retention</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" domain={[80, 100]} />
          <Tooltip contentStyle={{ backgroundColor: '#2a2a3b', border: 'none', borderRadius: '8px' }} />
          <Area type="monotone" dataKey="retention" stroke="#ff6b6b" fill="url(#colorRetention)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-4 w-full h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">T-CRM Analytics</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setChartType('growth')}
            className={`px-3 py-1 rounded-md text-xs ${chartType === 'growth' ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Growth
          </button>
          <button 
            onClick={() => setChartType('leads')}
            className={`px-3 py-1 rounded-md text-xs ${chartType === 'leads' ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Leads
          </button>
          <button 
            onClick={() => setChartType('retention')}
            className={`px-3 py-1 rounded-md text-xs ${chartType === 'retention' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            Retention
          </button>
        </div>
      </div>
      
      <div className="h-64 w-full">
        {chartType === 'growth' && renderGrowthChart()}
        {chartType === 'leads' && renderLeadsChart()}
        {chartType === 'retention' && renderRetentionChart()}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-slate-700 p-3 rounded-lg">
          <p className="text-slate-400 text-xs mb-1">Total Customers</p>
          <p className="text-white text-lg font-bold">{data[5].customers.toLocaleString()}</p>
          <p className="text-green-400 text-xs">↑ 32% from Q1</p>
        </div>
        <div className="bg-slate-700 p-3 rounded-lg">
          <p className="text-slate-400 text-xs mb-1">Conversion Rate</p>
          <p className="text-white text-lg font-bold">24.8%</p>
          <p className="text-green-400 text-xs">↑ 3.2% this month</p>
        </div>
        <div className="bg-slate-700 p-3 rounded-lg">
          <p className="text-slate-400 text-xs mb-1">Avg. Deal Size</p>
          <p className="text-white text-lg font-bold">$4,850</p>
          <p className="text-green-400 text-xs">↑ 5% this quarter</p>
        </div>
      </div>
    </div>
  );
}