'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Legend,CartesianGrid,Label, ReferenceLine, Area, AreaChart, Tooltip,ResponsiveContainer } from 'recharts';
import { curveCardinal } from "d3-shape";

const data = [
  { "date": "Jan 1", "revenue": 25000, "revenue_payg": 72000, "revenue_prepaid": 35000 },
  { "date": "Jan 2", "revenue": 30000, "revenue_payg": 95000, "revenue_prepaid": 42000 },
  { "date": "Jan 3", "revenue": 35000, "revenue_payg": 94000, "revenue_prepaid": 40000 },
  { "date": "Jan 4", "revenue": 40000, "revenue_payg": 95000, "revenue_prepaid": 52000 },
  { "date": "Jan 5", "revenue": 75000, "revenue_payg": 140000, "revenue_prepaid": 42000 },
  { "date": "Jan 6", "revenue": 80000, "revenue_payg": 79000, "revenue_prepaid": 38000 },
  { "date": "Jan 7", "revenue": 85000, "revenue_payg": 84000, "revenue_prepaid": 42000 },
  { "date": "Jan 8", "revenue": 100000, "revenue_payg": 95000, "revenue_prepaid": 47500 },
  { "date": "Jan 9", "revenue": 105000, "revenue_payg": 102000, "revenue_prepaid": 51000 },
  { "date": "Jan 10", "revenue": 150000, "revenue_payg": 140000, "revenue_prepaid": 70000 },
  { "date": "Jan 11", "revenue": 155000, "revenue_payg": 150000, "revenue_prepaid": 75000 },
  { "date": "Jan 12", "revenue": 160000, "revenue_payg": 155000, "revenue_prepaid": 77000 },
  { "date": "Jan 13", "revenue": 165000, "revenue_payg": 160000, "revenue_prepaid": 80000 },
  { "date": "Jan 14", "revenue": 170000, "revenue_payg": 165000, "revenue_prepaid": 82500 },
  { "date": "Jan 15", "revenue": 175000, "revenue_payg": 168000, "revenue_prepaid": 84000 },
  { "date": "Jan 16", "revenue": 180000, "revenue_payg": 175000, "revenue_prepaid": 87500 },
  { "date": "Jan 17", "revenue": 185000, "revenue_payg": 180000, "revenue_prepaid": 90000 },
  { "date": "Jan 18", "revenue": 190000, "revenue_payg": 185000, "revenue_prepaid": 92500 },
  { "date": "Jan 19", "revenue": 195000, "revenue_payg": 190000, "revenue_prepaid": 95000 },
  { "date": "Jan 20", "revenue": 200000, "revenue_payg": 190000, "revenue_prepaid": 95000 },
  { "date": "Jan 21", "revenue": 205000, "revenue_payg": 200000, "revenue_prepaid": 100000 },
  { "date": "Jan 22", "revenue": 210000, "revenue_payg": 205000, "revenue_prepaid": 102500 },
  { "date": "Jan 23", "revenue": 215000, "revenue_payg": 210000, "revenue_prepaid": 105000 },
  { "date": "Jan 24", "revenue": 220000, "revenue_payg": 215000, "revenue_prepaid": 107500 },
  { "date": "Jan 25", "revenue": 250000, "revenue_payg": 240000, "revenue_prepaid": 120000 },
  { "date": "Jan 26", "revenue": 255000, "revenue_payg": 250000, "revenue_prepaid": 125000 },
  { "date": "Jan 27", "revenue": 260000, "revenue_payg": 255000, "revenue_prepaid": 127500 },
  { "date": "Jan 28", "revenue": 265000, "revenue_payg": 260000, "revenue_prepaid": 130000 },
  { "date": "Jan 29", "revenue": 270000, "revenue_payg": 265000, "revenue_prepaid": 132500 },
  { "date": "Jan 30", "revenue": 275000, "revenue_payg": 270000, "revenue_prepaid": 135000 }
];
  
  export const RevenueChart = ({interval=0,mode='multiple'}:{interval:number,mode:string}) => {
    const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
    return (
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          
          data={data}
        >
          <defs>
            <linearGradient id="colorRevenue_payg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="colorRevenue_prepaid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date"
            axisLine={false}
            tickLine={false}
            interval={interval}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value/1000}M`}
          >
            <Label
        value="Revenue in $"
        angle={-90}
        position="insideLeft"
        style={{ textAnchor: "middle" }}
      />
            </YAxis>
          {/* <ReferenceLine y={150000} stroke="#0359af" strokeDasharray="3 3" /> */}
          {/* <ReferenceLine y={175000} stroke="#82ca9d" strokeDasharray="3 3" /> */}
          {/* <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            fill="#82bffd"
            strokeWidth={2}
          /> */}
           <Legend />
          <Area
            type="monotone"
            dataKey="revenue_payg"
            stroke="#2563eb"
            fill="#93C5FD"
            strokeWidth={2}
            name="Pay As you Go revenue"
          />
         {mode== 'multiple' && <Area
            type="monotone"
            dataKey="revenue_prepaid"
            stroke="#B653E2"
            fill="#EFDAFA"
            strokeWidth={2}
            name="Prepaid revenue"
          />}
          {/* <Area type="monotone" fill="#82bffd" dataKey="revenue_payg" stroke="#8884d8" fillOpacity={1} />
  <Area type="monotone" dataKey="revenue_prepaid" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
        </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
