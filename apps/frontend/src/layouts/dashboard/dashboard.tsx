import { SideBar } from '../../components/sidebar/SideBar';
import React from 'react';
import { Header } from '../../components/header/Header';

export const DashboardLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <SideBar></SideBar>
      <Header></Header>
      {props.children}
    </>
  );
};