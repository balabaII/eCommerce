export const shuffle = ( arr ) => [...arr].sort( () => 0.5 - Math.random() );

export const buildUrl = (url, params) => {
    let result = url;
    Object.entries(params).forEach( ( [key, value], index ) => {
        const sign = !index ? '?' : '&';
        result += `${sign}${key}=${value}`;
    });
    
    return result;
}

export const sumUp = (arr) => arr.reduce( (acc, item) => acc + item ,0)