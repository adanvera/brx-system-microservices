const fetch = require('node-fetch');

const API_KEY = 'lxk.488c9fff469a5023e42ef2c456b80dfb'
const API_URI = 'https://api.beta.luxor.tech/graphql'

const getAllMiners = async (req, res) => {
    console.log("Starting to get all miners");
    try {
        const { token } = req.headers
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });
        const response = await fetch(API_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                query: `query allMinersDetails {
                    allMinersDetails {
                        mpn{
                            ARRR
                            BTC
                            DASH
                            DCR
                            KMD
                            LBC
                            SC
                            SCP
                            ZEC
                            ZEN
                            EQUI
                            TBTC
                            ETH
                            TETH
                        }
                        duration {
                            seconds
                            minutes
                            hours
                            days
                            months
                            years
                        }
                        first
                        last
                        offset
                        before
                        after
                    }
                  }
                  `
            }),
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const currentProfile = async (req, res) => {
    console.log("Starting to get current profile");
    try {
        const { token } = req.headers
        if (!token) return res.status(400).json({ msg: `El token es obligatorio` });


        const response = await fetch(API_URI, {
            method: 'POST',
            headers: {
                'x-lux-api-key': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query currentProfile {
                    currentProfile {
                        id
                        rowId
                        firstName
                        lastName
                        email
                    }
                  }
                  `
            }),
        }),
            json = await response.json();
        res.json(json);
        console.log("Current profile obtained");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = {
    getAllMiners,
    currentProfile
}
