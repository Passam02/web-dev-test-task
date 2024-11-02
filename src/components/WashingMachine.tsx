import React, { useState } from 'react';
import { WashingMachine as WashingMachineType } from '../types/types';
import '../styles/WashingMachine.css';

const WashingMachine: React.FC<WashingMachineType> = ({
  name,
  capacity,
  dimensions,
  functions,
  energyClass,
  price,
  imageUrl,
  instalmentsPlan,
  popularity
}) => {
  const [selected, setSelected] = useState(false);
  
  return (
    <div className='euro-card'>
        <div className='content'>
            <div className='information'>
                <div className='image'>
                    <img src={imageUrl} alt={name} className='image'/>
                </div>
                <div className='description'>
                    <div className='specification-box'>
                        <h3 className="machine-name">{name}</h3>
                        <div className='specification-wrapper'>
                            <p className="specification-label">Pojemność (kg): <span className="specification-text">{capacity}</span></p>
                            <p className="specification-label">Wymiary (GxSxW): <span className="specification-text">{dimensions}</span></p>
                            <p className="specification-label">Funkcje: <span className="specification-text">{functions.join(', ')}</span></p>
                        </div>
                    </div>
                    <div className='energy-class-box'>
                        <p className="specification-label">Klasa Energetyczna</p>
                        <svg width="49" height="18" viewBox="0 0 49 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 17V1C0 0.447715 0.447716 0 1 0H42.4648C42.7992 0 43.1114 0.167102 43.2969 0.4453L48.6302 8.4453C48.8541 8.7812 48.8541 9.2188 48.6302 9.5547L43.2969 17.5547C43.1114 17.8329 42.7992 18 42.4648 18H1C0.447715 18 0 17.5523 0 17Z" fill="#009949"/>
                            <text x="10" y="10" fill="white" font-family="SamsungOne" font-size="12" text-anchor="middle" dominant-baseline="middle">{energyClass}</text>
                        </svg>
                    </div>
                    <div className='price-box'>
                        <p className='specification-label'>Cena obowiązuje: 15.09.2022 - 21.09.2022</p>
                        <div className='price-wrap'>
                            <p className="price">{price}</p>
                            <span className="price-end">
                                <span>00</span>
                                <span>zł</span>
                            </span>
                        </div>
                    </div>
                    {instalmentsPlan ? <p className='instalments'>53,31 zł x 60 rat</p> : ''}
                </div>
            </div> 
            <button 
                onClick={() => setSelected(!selected)} 
                className={`button ${selected ? 'button-selected' : ''}`}
                >
                {selected ? 'WYBRANE' : 'WYBIERZ'}
            </button>
        </div>
    </div>
  );
};

export default WashingMachine;