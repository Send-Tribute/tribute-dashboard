import React from 'react';
import ReactDOM from "react-dom";

const View = () => {
    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
}

let App = document.getElementById('app');

ReactDOM.render(<View></View>, App);