import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Layout} from '../../hoc/layout/layout'
import {Aside} from '../../hoc/aside/aside'

import LibGraphPage from '../lib-graph-page/lib-graph-page'

function App() {

  let routes = (
    <Switch>
      <Route path="/" exact component={LibGraphPage}/>
      <Redirect to="/"/>
    </Switch>
  )

  return (
    <React.Fragment>
      <Aside/>
      <Layout>
        {routes}
      </Layout>
    </React.Fragment>
  )
}

export default App
