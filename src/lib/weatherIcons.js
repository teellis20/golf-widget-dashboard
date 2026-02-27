const weatherIcons={
"clear-day":'<svg viewBox="1.5 3.5 29 29" xmlns="http://www.w3.org/2000/svg"><g transform="translate(16,-2)"><g transform="translate(0,16)" stroke="#ffc04a" stroke-width="2" stroke-linecap="round" fill="#ffc04a"><circle r="5"/><line y1="-9" y2="-6"/><line y1="6" y2="9"/><line x1="-9" x2="-6"/><line x1="6" x2="9"/><line x1="-6.4" y1="-6.4" x2="-4.2" y2="-4.2"/><line x1="6.4" y1="6.4" x2="4.2" y2="4.2"/><line x1="-6.4" y1="6.4" x2="-4.2" y2="4.2"/><line x1="6.4" y1="-6.4" x2="4.2" y2="-4.2"/></g></g></svg>',

"cloudy":'<svg viewBox="10 5 35.83 31.92" xmlns="http://www.w3.org/2000/svg"><path d="M27 38h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/></svg>',

"cloudy-2-day":'<svg viewBox="1.5 3.5 44.33 33.42" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="18" r="5" fill="#ffc04a"/><path d="M27 38h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#91c0f8" stroke="#fff" stroke-width="1.2"/></svg>',

"rainy-1":'<svg viewBox="10 10.33 35.83 33.08" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><line x1="24" y1="36" x2="24" y2="44" stroke="#91c0f8" stroke-width="2" stroke-linecap="round"/></svg>',

"rainy-2":'<svg viewBox="10 10.33 35.83 34.08" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><line x1="22" y1="36" x2="22" y2="44" stroke="#91c0f8" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="36" x2="30" y2="44" stroke="#91c0f8" stroke-width="2" stroke-linecap="round"/></svg>',

"rainy-3":'<svg viewBox="10 10.33 35.83 37.67" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><line x1="20" y1="36" x2="20" y2="44" stroke="#91c0f8" stroke-width="2" stroke-linecap="round"/><line x1="28" y1="36" x2="28" y2="44" stroke="#91c0f8" stroke-width="2" stroke-linecap="round"/><line x1="36" y1="36" x2="36" y2="44" stroke="#91c0f8" stroke-width="2" stroke-linecap="round"/></svg>',

"snowy-1":'<svg viewBox="10 10.33 35.83 33.33" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><circle cx="28" cy="40" r="2" fill="#57a0ee"/></svg>',

"snowy-2":'<svg viewBox="10 10.33 35.83 33.33" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><circle cx="24" cy="40" r="2" fill="#57a0ee"/><circle cx="32" cy="40" r="2" fill="#57a0ee"/></svg>',

"snowy-3":'<svg viewBox="10 10.33 35.83 33.33" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><circle cx="20" cy="40" r="2" fill="#57a0ee"/><circle cx="28" cy="40" r="2" fill="#57a0ee"/><circle cx="36" cy="40" r="2" fill="#57a0ee"/></svg>',

"isolated-thunderstorms":'<svg viewBox="10 10.33 35.83 37.67" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#91c0f8" stroke="#fff" stroke-width="1.2"/><polygon points="26,36 30,28 34,36 30,36 28,42" fill="#ffa500"/></svg>',

"scattered-thunderstorms":'<svg viewBox="10 10.33 35.83 37.67" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><polygon points="26,36 30,28 34,36 30,36 28,42" fill="#ffa500"/></svg>',

"severe-thunderstorm":'<svg viewBox="10 7 45 41" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#333" stroke="#fff" stroke-width="1.2"/><polygon points="26,36 30,28 34,36 30,36 28,42" fill="#ffa500"/><circle cx="44" cy="40" r="4" fill="#c00"/></svg>',

"wind":'<svg viewBox="3.5 12.5 46 33" xmlns="http://www.w3.org/2000/svg"><path d="M10 20h30a4 4 0 1 0-4-4" stroke="#57a0ee" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M6 28h34a4 4 0 1 0-4-4" stroke="#57a0ee" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',

"fog-day":'<svg viewBox="1.5 3.5 49 36" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="18" r="5" fill="#ffc04a"/><path d="M8 34h40M12 38h32M16 42h24" stroke="#57a0ee" stroke-width="2" stroke-linecap="round"/></svg>',

"hail":'<svg viewBox="10 10.33 35.83 37.67" xmlns="http://www.w3.org/2000/svg"><path d="M27 32h17a8 8 0 0 0 0-16 10 10 0 0 0-19-3 7 7 0 0 0-1 14h3z" fill="#57a0ee" stroke="#fff" stroke-width="1.2"/><circle cx="22" cy="40" r="2" fill="#91c0f8"/><circle cx="30" cy="40" r="2" fill="#91c0f8"/></svg>',

"frost-day":'<svg viewBox="1.5 3.5 46 44.5" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="18" r="5" fill="#ffc04a"/><path d="M8 34h40" stroke="#57a0ee" stroke-width="2" stroke-linecap="round"/><circle cx="28" cy="40" r="2" fill="#57a0ee"/></svg>'
};

export default weatherIcons;