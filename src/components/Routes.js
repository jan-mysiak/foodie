import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Categories from './Categories/Categories'
import Groceries from './Groceries/Groceries'
import Login from './Login/Login'
import Products from './Products/Products'

export default function Routes() {
    return (
        <Switch>
            <Route component={Groceries} path="/groceries" />
            <Route component={Products} path="/products" />
            <Route component={Categories} path="/categories" />
            <Route component={Login} path="/" />
        </Switch>
    )
}
