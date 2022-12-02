import { useEffect, useRef, useState } from 'react';
import QRCode from "react-qr-code";
import { useDebouncedCallback } from 'use-debounce';

import qrcodes from './airdrops.json';

import './App.css';

function App() {
  const [tokenId, setTokenId] = useState(0);
  const [qrToDisplay, setQrToDisplay] = useState();
  const { current: defaultState } = useRef(qrcodes.slice(0, 10));


  const debounced = useDebouncedCallback(
    () => {
      console.log(qrcodes[tokenId - 1])
      setQrToDisplay(qrcodes[tokenId - 1])
    },
    300
  );

  useEffect(() => {
    if (!tokenId) {
      setQrToDisplay(null)
    }

    debounced()

  }, [tokenId, debounced])



  return (
    <div className="App">

      <header className="App-header">
        <header style={{ textAlign: 'center', color: 'blueviolet', marginTop: '30px', marginBottom: '30px', fontWeight: 'bold' }}>Beardy</header>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <label htmlFor='#tokenIdInput'>TokenId: </label>
          <input id="tokenIdInput" value={tokenId} onChange={({ target: { value } }) => { setTokenId(value) }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {!qrToDisplay ?
            defaultState.map(link => {

              return (
                <div key={link.url} style={{ width: '23%', marginBottom: '50px' }} >
                  <p style={{ color: '#ffffff' }}>TokenID: {link.tokenId}</p>
                  <QRCode value={link.url} type='qr' bgColor='green' size={100} />
                </div>
              )
            })
            : qrToDisplay ? <div style={{ marginY: '50px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
              <p style={{ color: '#ffffff' }}>TokenID: {qrToDisplay.tokenId}</p>
              <QRCode value={qrToDisplay.url} type='qr' bgColor='green' size={100} />
            </div> : <></>}

          {/* {AirdropLinks.map(link => {

          return (
            <div key={link.url} style={{ width: '25%', marginBottom: '50px' }} >
              <p style={{ color: '#ffffff' }}>TokenID: {link.tokenId}</p>
              <QRCode value={link.url} />
            </div>
          )
        })} */}

        </div>
      </header >
    </div >
  );
}

export default App;
