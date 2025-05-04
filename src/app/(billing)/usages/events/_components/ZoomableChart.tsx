import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { ArrowLeft } from 'lucide-react';
import { Button, Card } from 'cb-sting-react-ts';
const NestedBarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Monthly data
  const monthlyData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  // Daily data for each month (sample data)
  const dailyData = {
    Jan: [
      { name: '1 Jan', value: 30 },
      { name: '2 Jan', value: 45 },
      { name: '3 Jan', value: 25 },
      { name: '4 Jan', value: 50 },
      { name: '5 Jan', value: 35 },
    ],
    Feb: [
      { name: '1 Feb', value: 20 },
      { name: '2 Feb', value: 35 },
      { name: '3 Feb', value: 40 },
      { name: '4 Feb', value: 30 },
      { name: '5 Feb', value: 25 },
      { name: '6 Feb', value: 25 },
      { name: '7 Feb', value: 25 },
      { name: '8 Feb', value: 25 },
      { name: '9 Feb', value: 25 },
    ],
    Mar: [
      { name: '1 Mar', value: 45 },
      { name: '2 Mar', value: 55 },
      { name: '3 Mar', value: 35 },
      { name: '4 Mar', value: 40 },
      { name: '5 Mar', value: 45 },
    ],
    Apr: [
      { name: '1 Apr', value: 60 },
      { name: '2 Apr', value: 65 },
      { name: '3 Apr', value: 55 },
      { name: '4 Apr', value: 70 },
      { name: '5 Apr', value: 50 },
    ],
    May: [
      { name: '1 May', value: 40 },
      { name: '2 May', value: 45 },
      { name: '3 May', value: 35 },
      { name: '4 May', value: 50 },
      { name: '5 May', value: 30 },
    ],
  };

  const handleBack = () => {
    setSelectedMonth(null);
  };

  const CustomBar = (props) => {
    const { fill, x, y, width, height, month } = props;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          cursor="pointer"
          onClick={() => !selectedMonth && setSelectedMonth(month)}
        />
      </g>
    );
  };

  return (
    <Card className="w-full">
      <Card.Header className="flex flex-row items-center justify-between">
        <div>
          {selectedMonth ? `Daily Data for ${selectedMonth}` : 'Monthly Overview'}
        </div>
        {selectedMonth && (
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Months
          </Button>
        )}
      </Card.Header>
      <Card.Content>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={selectedMonth ? dailyData[selectedMonth] : monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                angle={selectedMonth ? -45 : 0}
                textAnchor={selectedMonth ? "end" : "middle"}
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="value" 
                fill={selectedMonth ? "#82ca9d" : "#8884d8"}
                shape={(props) => <CustomBar {...props} month={props.payload.name} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>
    </Card>
  );
};
export default NestedBarChart;