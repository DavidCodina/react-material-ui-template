import React                       from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CreatePage  }             from '../pages/CreatePage';
import { NotesPage  }              from '../pages/NotesPage';
import { NotFoundPage }            from '../pages/NotFoundPage';


const Router = (props) => {
  const { value } = props;

  return (
    <Switch>  
      <Route exact path="/">
        <Redirect to="/notes" /> 
      </Route>

      <Route 
        exact path="/notes"
        render={(props) => {
          return <NotesPage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/create"
        render={(props) => {
          return <CreatePage {...props} value={value}  />;
        }}
      />

      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

