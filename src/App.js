import React from "react";

import Dashboard from "./WebPage/Dashboard";
import Outword, { action as OutwordAction, loader as OutwordLoader } from "./WebPage/Outword";
import Inword,{action as InwordAction} from "./WebPage/Inword.jsx";
import Inword_Report,{action as InwordReportAction} from "./WebPage/Inword_Report.jsx";
import Outword_Report,{action as OutwordReportAction} from "./WebPage/Outword_Report.jsx";
import Employ,{action as EmployeeAction} from "./WebPage/Employ.jsx";
import Item_list,{loader as AllItemsLoader} from "./WebPage/Item_list.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PageLayout from "./WebPage/PageLayout";
import {Toaster} from "react-hot-toast";
import Employ_list,{loader as EmployeeListLoader} from "./WebPage/Employ_list.jsx";
import UpdateData,{action as UpdateDataAction} from "./WebPage/UpdateData";
import OutwordData,{action as OutwordDataAction} from "./WebPage/OutwordData";


export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PageLayout/>,
            children: [
                {
                    path:"dashboard",
                    element: <Dashboard/>,

                },
                {
                    path: "Inword",
                    element: <Inword/>,
                    action:InwordAction
                },
                {
                    path: "outword",
                    element: <Outword/>,
                    action: OutwordAction,
                    loader: OutwordLoader
                },
                {
                    path: "item_list",
                    element: <Item_list/>,
                    loader:AllItemsLoader
                },
                {
                    path: "inword_report",
                    element: <Inword_Report/>,
                    action:InwordReportAction
                },
                {
                    path: "outword_report",
                    element: <Outword_Report/>,
                    action:OutwordReportAction
                },
                {
                    path: "outword_data",
                    element: <OutwordData/>,
                    action:OutwordDataAction
                },
                {
                    path: "employ",
                    element: <Employ/>,
                    action:EmployeeAction
                },
                {
                    path: "employ_list",
                    element: <Employ_list/>,
                    loader:EmployeeListLoader
                },
                {
                    path: "outword_data/:id",
                    element:<UpdateData/>,
                    action:UpdateDataAction
                }
            
            ]
        }

    ])
    return <>
    <RouterProvider router={router}/>
    <Toaster/>
    </>


}