"use client";

import { Status } from "@prisma/client";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


interface Props {
    data: dataElements[];
}

interface dataElements {
    name: Status;
    total: number;
}

const DashChart = ({data}: Props) => {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Ticket Counts</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Bar
                            dataKey="total"
                            fill="#60A5FA"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
};

export default DashChart;