import React, { useState } from 'react';
import WashingMachine from './WashingMachine';
import CustomSelect from './CustomSelect';
import washingMachinesData from '../data/WashingMachinesData';
import '../styles/WashingMachineSearch.css';

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('');
    const [selectedFunction, setSelectedFunction] = useState('');
    const [energyClass, setEnergyClass] = useState('');
    const [capacity, setCapacity] = useState('');

    const [visibleCount, setVisibleCount] = useState(6); 

    const functions = ['Drzwi AddWash™', 'Panel AI Control', 'Silnik inwerterowy', 'Wyświetlacz elektroniczny'];

    const filteredMachines = washingMachinesData
      .filter((machine) =>
        machine.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((machine) => !selectedFunction || machine.functions.includes(selectedFunction))
      .filter((machine) => !energyClass || machine.energyClass === energyClass)
      .filter((machine) => !capacity || machine.capacity === capacity)
      .sort((a, b) => {
        if (sort === 'Cena') return a.price - b.price;
        if (sort === 'Pojemność') return parseFloat(a.capacity) - parseFloat(b.capacity);
        if (sort === 'Popularność') return b.popularity - a.popularity;
        return 0;
      });

    const displayedMachines = filteredMachines.slice(0, visibleCount);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 6, filteredMachines.length)); 
    };
  
    return (
      <div className='component-wrapper'>
        <span className='select-device'>Wybierz urządzenie</span>
        <div className="search-component">
            <div className='search-bar-wrapper'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='search-bar'
                />
            </div>
            <div className='filters-box'>
                <div className="sort-box">
                    <label htmlFor="sort" className="sort-label">Sortuj po:</label>
                    <CustomSelect
                        options={[
                            { value: '', label: 'Wszystkie' },
                            { value: 'Cena', label: 'Cena' },
                            { value: 'Pojemność', label: 'Pojemność' },
                            { value: 'Popularność', label: 'Popularność' },
                        ]}
                        selectedValue={sort}
                        onChange={setSort}
                    />
                </div>

                <div className="sort-box">
                    <label htmlFor="functions" className="sort-label">Funkcje:</label>
                    <CustomSelect
                        options={[
                            { value: '', label: 'Wszystkie' },
                            ...functions.map((func) => ({
                                value: func,
                                label: func,
                            })),
                        ]}
                        selectedValue={selectedFunction}
                        onChange={setSelectedFunction}
                    />
                </div>

                <div className="sort-box">
                    <label htmlFor="energy-class" className="sort-label">Klasa energetyczna:</label>
                    <CustomSelect
                        options={[
                            { value: '', label: 'Wszystkie' },
                            { value: 'A', label: 'A' },
                            { value: 'B', label: 'B' },
                            { value: 'C', label: 'C' },
                            { value: 'D', label: 'D' },
                            { value: 'E', label: 'E' },
                            { value: 'F', label: 'F' },
                        ]}
                        selectedValue={energyClass}
                        onChange={setEnergyClass}
                    />
                </div>

                <div className="sort-box">
                    <label htmlFor="capacity" className="sort-label">Pojemność:</label>
                    <CustomSelect
                        options={[
                            { value: '', label: 'Wszystkie' },
                            { value: '9', label: '9kg' },
                            { value: '8', label: '8kg' },
                            { value: '10,5', label: '10.5kg' },
                        ]}
                        selectedValue={capacity}
                        onChange={setCapacity}
                    />
                </div>
            </div>
    
            <div>
                <span className='total-number'>Liczba wyników: {filteredMachines.length}</span>
                <div className="washing-machine-list">
                {displayedMachines.map((machine) => (
                    <WashingMachine key={machine.id} {...machine} />
                ))}
                </div>
                {visibleCount < filteredMachines.length && (
                    <span className='show-more' onClick={handleShowMore}>
                        Pokaż więcej 
                        <svg className='show-more-icon' width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 5.5L6.53109 0.25H0.468911L3.5 5.5Z" fill="#007AFF"/>
                        </svg>
                    </span>
                )}
            </div>
        </div>
      </div>
    );
};
  
export default SearchComponent;