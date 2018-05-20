import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./components/reducers/index.js";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WritePage from "./components/Pages/WritePage/WritePage.js";
import WriteviewPage from "./components/Pages/WriteviewPage/WriteviewPage.js";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <div>
                <Route exact path ="/" component = {App} />
                <Switch>
                    <Route path = "/:no/modify" component = {WritePage}/>
                    <Route path = "/board" component = {WritePage} />
                    <Route path = "/:no" component = {WriteviewPage} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
