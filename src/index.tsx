import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'rsuite/dist/rsuite.min.css'
import './index.css'
import './fonts.css'

/*
import axios from 'axios'
import {templateURL_V1} from './api/const'
import { authHeader } from './api/auth/auth.header'
import { Countries } from './countries'

async function initCountries() {
    Countries.map(async value => {
        await axios({
            method: 'POST',
            url: `${templateURL_V1}/region/create`,
            data: {
                region_name: `Россия, ${value.label}`,
                region_short_name: `${value.label}`
            },
        });

        setTimeout(() => {
            console.log(`${value.value} init`);
        }, 300);
    });
}

initCountries().then(() => {console.log("CITIES INIT SUCCESS")});
 */

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)
root.render(
    <App />,
)
