import { Column, CreateHeader, Grid } from 'cb-sting-react-ts'
import React, { HTMLAttributes } from 'react'
import { cn } from '@/app/lib/utils'
interface CreateLayoutComposition {
  Header: React.FC<HeaderProps>
  Content: React.FC<ContentProps>
  TabsNav: React.FC<NavProps>
  SideNav: React.FC<NavProps>
  Grid: React.FC<CreateLayoutGridProps>
}

interface CreateLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  gridColumns?: number
}

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: string | number | React.ReactElement | React.ReactElement[]
  title?: string
}

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: string | number | React.ReactElement | React.ReactElement[]
  span?: number
}

interface NavProps extends HTMLAttributes<HTMLDivElement> {
  children?: string | number | React.ReactElement | React.ReactElement[]
  span?: number
}

interface CreateLayoutGridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  gridColumns?: number
}

const CreateLayout: React.FC<CreateLayoutProps> & CreateLayoutComposition = ({ 
  children, 
  gridColumns = 12,
  className,
  ...props 
}) => {
  return (
    <div className={cn("create-layout relative h-full", className)} {...props}>
      {children}
    </div>
  )
}

const Header: React.FC<HeaderProps> = ({ 
  children, 
  title,
  className,
  ...props 
}) => {
  return (
    <div className={cn("sticky  left-0 right-0 z-10", className)} {...props}>
      {children}
    </div>
  )
}

const ContentGrid: React.FC<CreateLayoutGridProps> = ({ 
  children, 
  gridColumns = 12,
  className,
  ...props 
}) => {
  return (
    <Grid cols={gridColumns} className={cn(className)} {...props}>
      {children}
    </Grid>
  )
}

const Content: React.FC<ContentProps> = ({ 
  children, 
  span = 8,
  className,
  ...props 
}) => {
  return (
    <Column 
      className={cn("main-content p-large", className)} 
      span={span} 
      {...props}
    >
      <div>{children}</div>
    </Column>
  )
}

const TabsNav: React.FC<NavProps> = ({ 
  children, 
  span = 2,
  className,
  ...props 
}) => {
  return (
    <Column 
      className={cn("tabs-nav s-p-large", className)} 
      span={span}
      {...props}
    >
      {children}
    </Column>
  )
}

const SideNav: React.FC<NavProps> = ({ 
  children, 
  span = 2,
  className,
  ...props 
}) => {
  return (
    <Column 
      className={cn("side-nav s-p-large", className)} 
      span={span}
      {...props}
    >
      {children}
    </Column>
  )
}

CreateLayout.Header = Header
CreateLayout.Content = Content
CreateLayout.TabsNav = TabsNav
CreateLayout.SideNav = SideNav
CreateLayout.Grid = ContentGrid

export { CreateLayout, cn }